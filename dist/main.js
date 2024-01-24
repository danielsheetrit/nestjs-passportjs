"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const config_keys_1 = require("./utils/config/config-keys");
const ArgsValidationError_1 = require("./utils/errors/ArgsValidationError");
const session = require("express-session");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.init();
    const configService = new config_1.ConfigService();
    app.useGlobalPipes(ArgsValidationError_1.argsValidationError);
    app.enableCors({
        origin: [configService.get(config_keys_1.configKeys.frontendEndpoint)],
    });
    app.use(session({
        secret: configService.get(config_keys_1.configKeys.sessionSecret),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: parseInt(configService.get(config_keys_1.configKeys.sessionMaxAge), 10)
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(parseInt(configService.get(config_keys_1.configKeys.port), 10));
}
bootstrap();
//# sourceMappingURL=main.js.map