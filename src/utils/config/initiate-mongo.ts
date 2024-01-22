import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { configKeys } from "./config-keys";

export const mongoModel = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get(configKeys.mongoUri),
    dbName: configService.get(configKeys.dbName),
  }),
  inject: [ConfigService],
});
