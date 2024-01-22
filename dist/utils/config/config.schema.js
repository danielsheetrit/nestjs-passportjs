"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configValidationSchema = void 0;
const Joi = require("joi");
const config_keys_1 = require("./config.keys");
exports.configValidationSchema = Joi.object({
    [config_keys_1.configKeys.mongoUri]: Joi.string().required(),
    [config_keys_1.configKeys.port]: Joi.number().default(8000),
    [config_keys_1.configKeys.frontendEndpoint]: Joi.string().required(),
    [config_keys_1.configKeys.hashSecret]: Joi.number().default(10),
    [config_keys_1.configKeys.dbName]: Joi.string().required(),
});
//# sourceMappingURL=config.schema.js.map