"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsValidationError = void 0;
const common_1 = require("@nestjs/common");
exports.argsValidationError = new common_1.ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => {
        return new common_1.HttpException({
            status: common_1.HttpStatus.BAD_REQUEST,
            error: "Validation failed",
            message: errors,
            timestamp: new Date().toISOString()
        }, common_1.HttpStatus.BAD_REQUEST);
    },
});
//# sourceMappingURL=ArgsValidationError.js.map