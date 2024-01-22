import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt'

import { UsersService } from "src/users/users.service";
import { configKeys } from "src/utils/config/config.keys";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private configService: ConfigService) {}

  async signupNewUser(username: string, password: string): Promise<any> {
    const hashSecret = this.configService.get<string>(configKeys.hashSecret)    
    const hashedPassword = await bcrypt.hash(password, hashSecret);

    const user = await this.usersService.insertUser(username, hashedPassword);

    if (user) {
      const { password, ...rest } = user;
      return rest;
    }
  }
}
