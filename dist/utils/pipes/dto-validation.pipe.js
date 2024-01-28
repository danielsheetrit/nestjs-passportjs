"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtoValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const dto_validation_exception_1 = require("../exceptions/dto-validation.exception");
exports.dtoValidationPipe = new common_1.ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
            property: error.property,
            constraints: error.constraints,
        }));
        throw new dto_validation_exception_1.DTOValidationException(formattedErrors);
    },
});
//# sourceMappingURL=dto-validation.pipe.js.map