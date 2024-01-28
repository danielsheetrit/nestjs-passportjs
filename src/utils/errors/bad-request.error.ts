import { HttpException, HttpStatus } from "@nestjs/common";

// Http Exception is a nest built in Error
export class BadRequestError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
