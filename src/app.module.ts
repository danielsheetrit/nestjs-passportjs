import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";

// External Modules
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

// Config and Environment Variables
import { ConfigModule, ConfigService } from "@nestjs/config";
import { configValidationSchema } from "./utils/config/config.schema";
import { configKeys } from "./utils/config/config.keys";

@Module({
  imports: [
    // Enabeling environment variables
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    // its async because it depends on enviroment variables
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get(configKeys.mongoUri),
        dbName: configService.get(configKeys.dbName)
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
