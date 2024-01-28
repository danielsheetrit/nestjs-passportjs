"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const common_1 = require("@nestjs/common");
class BadRequestError extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=bad-request.error.js.map