import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { LocalStrategy } from "./local.strategy";
import { SessionSerializer } from "./helpers/session.serializer";

@Module({
  imports: [UsersModule, PassportModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
