"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const config_keys_1 = require("./utils/config/config-keys");
const dto_validation_pipe_1 = require("./utils/pipes/dto-validation.pipe");
const session = require("express-session");
const passport = require("passport");
const logger_service_1 = require("./utils/config/logger.service");
const http_filter_1 = require("./utils/error-filters/http.filter");
const dto_filter_1 = require("./utils/error-filters/dto.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    app.init();
    const configService = new config_1.ConfigService();
    const logger = new logger_service_1.CustomLogger();
    app.useLogger(logger);
    app.useGlobalPipes(dto_validation_pipe_1.dtoValidationPipe);
    app.useGlobalFilters(new dto_filter_1.DTOValidationFilter());
    app.useGlobalFilters(new http_filter_1.HttpFilter());
    app.enableCors({
        origin: [configService.get(config_keys_1.configKeys.frontendEndpoint)],
    });
    app.use(session({
        secret: configService.get(config_keys_1.configKeys.sessionSecret),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: parseInt(configService.get(config_keys_1.configKeys.sessionMaxAge), 10),
        },
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(parseInt(configService.get(config_keys_1.configKeys.port), 10));
    logger.info('App is Listening on port: ' + configService.get(config_keys_1.configKeys.port));
}
bootstrap();
//# sourceMappingURL=main.js.map