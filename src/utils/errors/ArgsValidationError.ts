import { HttpException, HttpStatus, ValidationPipe } from "@nestjs/common";

export const argsValidationError = new ValidationPipe({
  whitelist: true, // Strip properties that do not have any decorators
  forbidNonWhitelisted: true, // Throw errors if non-whitelisted values are provided
  transform: true,
  exceptionFactory: (errors) => {
    return new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: "Validation failed",
        message: errors,
        timestamp: new Date().toISOString()
      },
      HttpStatus.BAD_REQUEST
    );
  },
});

// message: errors. error object on invalid username field looks like:
// {
//   "target": {
//     "usernhame": "danielking",
//     "password": "mambo"
//   },
//   "property": "username",
//   "children": [],
//   "constraints": {
//     "isNotEmpty": "username should not be empty"
//   }
// }
