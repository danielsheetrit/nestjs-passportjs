"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidPassword = exports.IsValidPasswordConstraint = void 0;
const class_validator_1 = require("class-validator");
let IsValidPasswordConstraint = class IsValidPasswordConstraint {
    validate(password, args) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[\W_]/.test(password);
        return (typeof password === "string" &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumber &&
            hasSpecialChar &&
            password.length >= 8 &&
            password.length < 20);
    }
    defaultMessage(args) {
        return "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
    }
};
exports.IsValidPasswordConstraint = IsValidPasswordConstraint;
exports.IsValidPasswordConstraint = IsValidPasswordConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsValidPasswordConstraint);
function IsValidPassword(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isValidPassword",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidPasswordConstraint,
        });
    };
}
exports.IsValidPassword = IsValidPassword;
//# sourceMappingURL=password-validator.decorator.js.map