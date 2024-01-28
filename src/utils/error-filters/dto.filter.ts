import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { DTOValidationException } from "../exceptions/dto-validation.exception";
import { Logger } from "@nestjs/common";

@Catch(DTOValidationException)
export class DTOValidationFilter implements ExceptionFilter {
  catch(exception: DTOValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    Logger.error(`
      dto-validation-error at: ${request.url},
      ${JSON.stringify(exception.errors).toString()}
    `);

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(), // UTC time
      path: request.url,
      message: "dto-validation-error",
      errors: exception.errors,
    });
  }
}
