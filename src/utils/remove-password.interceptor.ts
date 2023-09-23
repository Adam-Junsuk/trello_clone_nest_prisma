// remove-password.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => this.removePasswordField(item));
        }
        return this.removePasswordField(data);
      }),
    );
  }

  private removePasswordField(data: any): any {
    if (data && data.password) {
      const { password, ...result } = data;
      return result;
    }
    return data;
  }
}
