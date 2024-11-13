import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(BadRequestException)
export class CustomValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as
      | { message: any; error: string }
      | { message: ValidationError[] };

    let customResponse = {};

    if (Array.isArray(exceptionResponse.message) && status === 400) {
      const validationErrors = exceptionResponse.message;

      customResponse = {
        title: 'Validation failed',
        desc: validationErrors.map((error) =>
          typeof error === 'string' ? error : error.constraints,
        ),
      };
    } else {
      customResponse = exceptionResponse;
    }

    response.status(status).json(customResponse);
  }
}
