import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

// External Modules
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

import { mongoModel } from "./utils/config/initiate-mongo";
import { envModel } from "./utils/config/initiate-env";

@Module({
  imports: [
    envModel,
    mongoModel,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
