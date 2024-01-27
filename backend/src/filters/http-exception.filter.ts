import { HttpAdapterHost } from '@nestjs/core';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger;

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    this.logger = new Logger();
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      (exception instanceof HttpException && exception.getStatus()) ||
      exception['status'] ||
      HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      (exception instanceof HttpException &&
        exception.getResponse()?.['message']) ||
      exception['message'] ||
      'Internal server error';

    // @Error format for development ENV
    const devErrorResponse = {
      timestamp: new Date().toISOString(),
      message,
      status,
      data: {
        path: request.url,
        method: request.method,
      },
    };
    // @Error format for production ENV
    const prodErrorResponse = {
      statusCode: status,
      message,
    };

    // Send Error
    try {
      httpAdapter.reply(
        response,
        process.env.NODE_ENV === 'development'
          ? devErrorResponse
          : prodErrorResponse,
        status,
      );

      // send log
      this.logger.log(
        process.env.NODE_ENV === 'development'
          ? devErrorResponse
          : prodErrorResponse,
      );
    } catch (errorAfterResponseSent) {
      // Log the error
      this.logger.error(errorAfterResponseSent);
    }
  }
}
