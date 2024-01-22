"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoModel = void 0;
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const config_keys_1 = require("./config-keys");
exports.mongoModel = mongoose_1.MongooseModule.forRootAsync({
    imports: [config_1.ConfigModule],
    useFactory: async (configService) => ({
        uri: configService.get(config_keys_1.configKeys.mongoUri),
        dbName: configService.get(config_keys_1.configKeys.dbName),
    }),
    inject: [config_1.ConfigService],
});
//# sourceMappingURL=initiate-mongo.js.map