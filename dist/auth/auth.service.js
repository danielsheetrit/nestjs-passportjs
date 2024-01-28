"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const config_keys_1 = require("../utils/config/config-keys");
const bad_request_error_1 = require("../utils/errors/bad-request.error");
let AuthService = class AuthService {
    constructor(usersService, configService) {
        this.usersService = usersService;
        this.configService = configService;
    }
    async signupNewUser(username, password) {
        const saltRound = this.configService.get(config_keys_1.configKeys.saltRound);
        const hashedPassword = await bcrypt.hash(password, saltRound);
        const user = await this.usersService.insertUser(username, hashedPassword);
        if (user) {
            const { password, ...rest } = user;
            return rest;
        }
    }
    async validateUser(username, password) {
        const user = await this.usersService.getUser(username);
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!user || !passwordValid) {
            throw new bad_request_error_1.BadRequestError("Password or Username are Invalid");
        }
        return {
            userId: user.id,
            userName: user.username,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map