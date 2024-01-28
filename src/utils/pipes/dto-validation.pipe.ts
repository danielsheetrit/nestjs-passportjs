import { ValidationPipe } from "@nestjs/common";
import { DTOValidationException } from "../exceptions/dto-validation.exception";

export const dtoValidationPipe = new ValidationPipe({
  whitelist: true, // Get rid of properties that are not listed in the DTO
  forbidNonWhitelisted: true, // Throw errors if non-whitelisted values are provided
  /**
   * Transform Convert the request object to be typed supported 🔥🔥🔥
   * And transform JSON data(body), path and query parameters to primitive types aswell 🔥🔥🔥
   */
  transform: true,
  exceptionFactory: (errors) => {
    const formattedErrors = errors.map((error) => ({
      property: error.property,
      constraints: error.constraints,
    }));
    throw new DTOValidationException(formattedErrors);
  },
});

// Errors Array will look like so:
// "errors": [
//   {
//     "property": "usernamKe",
//     "constraints": {
//       "whitelistValidation": "property usernamKe should not exist"
//     }
//   },
//   {
//     "property": "username",
//     "constraints": {
//       "isNotEmpty": "username should not be empty"
//     }
//   }
// ]
