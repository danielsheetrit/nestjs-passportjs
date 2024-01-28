import { HttpException } from "@nestjs/common";
export declare class BadRequestError extends HttpException {
    constructor(message: string);
}
