import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

import { mongoModel } from "./utils/config/initiate-mongo";
import { envModel } from "./utils/config/initiate-env";

// External Modules
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [envModel, mongoModel, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
