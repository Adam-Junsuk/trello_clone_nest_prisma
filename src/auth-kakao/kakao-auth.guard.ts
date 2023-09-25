// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Observable } from 'rxjs';

// @Injectable()
// export class KakaoOauthGuard extends AuthGuard('kakao') {
//   constructor() {
//     super();
//   }

//   async canActivate(context: ExecutionContext) {
//     const activate = (await super.canActivate(context)) as boolean;
//     const reqeust = context.switchToHttp().getRequest();
//     await super.logIn(reqeust);
//     return activate;
//   }
// }
