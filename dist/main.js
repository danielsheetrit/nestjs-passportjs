"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const config_keys_1 = require("./utils/config/config-keys");
const ArgsValidationError_1 = require("./utils/errors/ArgsValidationError");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.init();
    app.useGlobalPipes(ArgsValidationError_1.argsValidationError);
    const configService = new config_1.ConfigService();
    app.enableCors({
        origin: [configService.get(config_keys_1.configKeys.frontendEndpoint)],
    });
    await app.listen(configService.get(config_keys_1.configKeys.port));
}
bootstrap();
//# sourceMappingURL=main.js.map