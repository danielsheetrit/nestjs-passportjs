"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DTOValidationFilter = void 0;
const common_1 = require("@nestjs/common");
const dto_validation_exception_1 = require("../exceptions/dto-validation.exception");
const common_2 = require("@nestjs/common");
let DTOValidationFilter = class DTOValidationFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        common_2.Logger.error(`dto-validation-error at: ${request.url}`);
        response.status(common_1.HttpStatus.BAD_REQUEST).json({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: "dto-validation-error",
            errors: exception.errors,
        });
    }
};
exports.DTOValidationFilter = DTOValidationFilter;
exports.DTOValidationFilter = DTOValidationFilter = __decorate([
    (0, common_1.Catch)(dto_validation_exception_1.DTOValidationException)
], DTOValidationFilter);
//# sourceMappingURL=dto.filter.js.map