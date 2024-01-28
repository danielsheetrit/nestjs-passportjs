import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

import { UsersService } from "src/users/users.service";
import { configKeys } from "src/utils/config/config-keys";
import { BadRequestError } from "src/utils/errors/bad-request.error";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async signupNewUser(username: string, password: string): Promise<any> {
    const saltRound = this.configService.get<number>(configKeys.saltRound);
    
    const hashedPassword = await bcrypt.hash(password, saltRound);
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
      throw new BadRequestError("Password or Username are Invalid");
    }

    return {
      userId: user.id,
      userName: user.username,
    };
  }
}
