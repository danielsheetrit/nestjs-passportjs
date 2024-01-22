import { AuthService } from "./auth.service";
import { SignupDTO } from "./dto/signup.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupBody: SignupDTO): Promise<void>;
}
