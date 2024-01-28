"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configValidationSchema = void 0;
const Joi = require("joi");
const config_keys_1 = require("./config-keys");
exports.configValidationSchema = Joi.object({
    [config_keys_1.configKeys.mongoUri]: Joi.string().required(),
    [config_keys_1.configKeys.port]: Joi.number().default(8000),
    [config_keys_1.configKeys.frontendEndpoint]: Joi.string().required(),
    [config_keys_1.configKeys.saltRound]: Joi.number().default(10),
    [config_keys_1.configKeys.dbName]: Joi.string().required(),
    [config_keys_1.configKeys.sessionSecret]: Joi.string().required(),
    [config_keys_1.configKeys.sessionMaxAge]: Joi.number().required(),
    [config_keys_1.configKeys.awsAccessKey]: Joi.string().required(),
    [config_keys_1.configKeys.awsSecretKey]: Joi.string().required(),
    [config_keys_1.configKeys.currentEnv]: Joi.string().required(),
    [config_keys_1.configKeys.awsRegion]: Joi.string().required(),
});
//# sourceMappingURL=config.schema.js.map