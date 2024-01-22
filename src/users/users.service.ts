import { HttpException, HttpStatus, Injectable, UseFilters } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./users.model";
import { ErrorWithMessage } from "src/utils/errors/ErrorWithMessage";

@Injectable()
export class UsersService {
  constructor(@InjectModel("user") private readonly userModel: Model<User>) {}

  async insertUser(userName: string, password: string) {
    const username = userName.toLowerCase();
    const newUser = new this.userModel({
      username,
      password,
    });

    await newUser.save();
    return newUser;
  }

  async getUser(userName: string) {
    const username = userName.toLowerCase();
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    return user;
  }
}
