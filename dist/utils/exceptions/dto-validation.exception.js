"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DTOValidationException = void 0;
class DTOValidationException extends Error {
    constructor(errors = null) {
        super();
        this.errors = errors;
        this.name = "DTOValidationException";
    }
}
exports.DTOValidationException = DTOValidationException;
//# sourceMappingURL=dto-validation.exception.js.map