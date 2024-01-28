import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDTO } from "./dto/signup.dto";
import { LocalAuthGuard } from "./guards/local.guard";
import { AuthenticatedGuard } from "./guards/authenticated.guard";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async signup(@Body() signupBody: SignupDTO) {
    const { password, username } = signupBody;
    await this.authService.signupNewUser(username, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post("/signin")
  @HttpCode(HttpStatus.OK)
  signin(@Request() req): any {
    return { User: req.user, msg: "User logged in" };
  }

  @UseGuards(AuthenticatedGuard)
  @Get("/protected")
  getUser(@Request() req): string {
    return req.user;
  }

  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' }
  }
}
