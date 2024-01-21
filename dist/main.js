"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const constants_1 = require("./utils/constants");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [constants_1.VITE_DEV_HOST],
    });
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map