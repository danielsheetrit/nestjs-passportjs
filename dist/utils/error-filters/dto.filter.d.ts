import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { DTOValidationException } from "../exceptions/dto-validation.exception";
export declare class DTOValidationFilter implements ExceptionFilter {
    catch(exception: DTOValidationException, host: ArgumentsHost): void;
}
