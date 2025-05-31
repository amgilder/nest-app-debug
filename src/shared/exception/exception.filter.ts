import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { Request, Response } from "express";

@Catch(HttpException)
export class GenericExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctxt = host.switchToHttp();
    const response = ctxt.getResponse<Response>();
    const request = ctxt.getRequest<Request>();
    const status = exception.getStatus();
    let validationErrors: Record<string, string> = {};
    // console.log(exception);
    if (Array.isArray(exception.cause)) {
      const errors = exception.cause as ValidationError[]
      errors.forEach(error => {
        if (error.constraints) {
          validationErrors[error.property] = Object.values(error.constraints)[0];
        }
      })
    }
    response.status(status).json({
      status,
      timestamp: Date.now(),
      path: request.url,
      message: exception.message,
      validationErrors,
    });
  }
}