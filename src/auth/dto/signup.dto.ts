// DTO = Data Transfer Objects
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class SignupDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: "Password too short",
  })
  @MaxLength(20, {
    message: "Password too long",
  })
  password: string;
}
