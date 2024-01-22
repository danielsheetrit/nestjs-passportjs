import { Body, Controller, HttpCode, Post, UseFilters } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDTO } from "./dto/signup.dto";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  @HttpCode(200)
  async signup(@Body() signupBody: SignupDTO) {
    const { password, username } = signupBody;
    await this.authService.signupNewUser(username, password);
  }
}
