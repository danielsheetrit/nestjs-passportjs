import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class ErrorWithMessage implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
