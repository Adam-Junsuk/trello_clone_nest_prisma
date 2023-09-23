import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };
    // new Exceopton('',404) 이렇게 에러객체에 담긴 메시지 찍힘

    if (typeof error === 'string') {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: error,
      });
    } else {
      response.status(status).json({
        sucess: false,
        timestamp: new Date().toISOString(),
        ...error,
      });
    }
  }
}
//미들웨어다음 컨트롤러다음 서비스다음 exception 거져 사용자응답
