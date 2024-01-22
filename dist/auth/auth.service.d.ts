import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/users/users.service";
export declare class AuthService {
    private usersService;
    private configService;
    constructor(usersService: UsersService, configService: ConfigService);
    signupNewUser(username: string, password: string): Promise<any>;
    validateUser(username: string, password: string): Promise<any>;
}
