import { ValidationOptions, ValidationArguments, ValidatorConstraintInterface } from "class-validator";
export declare class IsValidPasswordConstraint implements ValidatorConstraintInterface {
    validate(password: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsValidPassword(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
