export class DTOValidationException extends Error {
  errors: any;

  constructor(errors: any = null) {
    super();    
    this.errors = errors;
    this.name = "DTOValidationException";
  }
}
