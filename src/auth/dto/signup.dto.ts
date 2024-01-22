// DTO = Data Transfer Objects
import { IsNotEmpty } from "class-validator";
import { IsValidPassword } from "src/utils/decorators/password-validator.decorator";

export class SignupDTO {
  @IsNotEmpty()
  username: string;

 @IsValidPassword()
  password: string;
}
