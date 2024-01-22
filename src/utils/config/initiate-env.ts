import { ConfigModule } from "@nestjs/config";
import { configValidationSchema } from "./config.schema";

// Enabeling environment variables
export const envModel = ConfigModule.forRoot({
  envFilePath: ".env",
  isGlobal: true,
  validationSchema: configValidationSchema,
});
