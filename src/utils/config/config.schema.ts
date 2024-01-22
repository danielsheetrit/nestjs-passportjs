import * as Joi from "joi";
import { configKeys } from "./config-keys";

export const configValidationSchema = Joi.object({
  [configKeys.mongoUri]: Joi.string().required(),
  [configKeys.port]: Joi.number().default(8000),
  [configKeys.frontendEndpoint]: Joi.string().required(),
  [configKeys.saltRound]: Joi.number().default(10),
  [configKeys.dbName]: Joi.string().required(),
  [configKeys.sessionSecret]: Joi.string().required(),
});
