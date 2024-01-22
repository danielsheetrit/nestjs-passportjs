"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envModel = void 0;
const config_1 = require("@nestjs/config");
const config_schema_1 = require("./config.schema");
exports.envModel = config_1.ConfigModule.forRoot({
    envFilePath: ".env",
    isGlobal: true,
    validationSchema: config_schema_1.configValidationSchema,
});
//# sourceMappingURL=initiate-env.js.map