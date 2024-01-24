import { Injectable, UseFilters } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { ErrorWithMessage } from "src/utils/errors/ErrorWithMessage";
import { HttpException, HttpStatus } from "@nestjs/common";

import { UsersService } from "src/users/users.service";
import { configKeys } from "src/utils/config/config-keys";

@Injectable()
@UseFilters(ErrorWithMessage)
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async signupNewUser(username: string, password: string): Promise<any> {
    const hashSecret = this.configService.get<string>(configKeys.saltRound);
    const hashedPassword = await bcrypt.hash(password, parseInt(hashSecret));

    const user = await this.usersService.insertUser(username, hashedPassword);

    if (user) {
      const { password, ...rest } = user;
      return rest;
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user || !passwordValid) {
      throw new HttpException(
        "Password or Username are Invalid",
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      userId: user.id,
      userName: user.username,
    };
  }
}
