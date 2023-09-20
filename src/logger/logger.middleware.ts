import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.logger.log(
        `${req.ip} ${req.method} ${res.statusCode}`,
        req.originalUrl,
      );
    });
    //요청정보찍히고 반환시 실패성공도 찍힘
    // 이 코드의 주요 부분은 res.on('finish', () => { ... }) 부분입니다.
    // 이 부분은 HTTP 응답이 완료되었을 때 실행되는 이벤트 핸들러를 정의합니다.
    // 즉, 클라이언트에게 응답이 전송되고 연결이 종료된 후에 코드 블록이 실행됩니다.
    //this.logger.log(req, res, next);
    //this.logger.log(`${req.ip} ${req.method}`, req.originalUrl);
    //콘솔로그말고 nest.js 에서 제공하는 로깅을 사용
    // console.log(req.ip);
    // console.log(req.originalUrl);
    next();
  }
}
