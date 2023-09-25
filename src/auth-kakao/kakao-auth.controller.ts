// import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { JwtAuthService } from 'src/auth-google/jwt-auth.service';
// import { KakaoOauthGuard } from './kakao-auth.guard';

// @Controller('auth/kakao')
// export class KakaoOauthController {
//   constructor(private jwtAuthSerive: JwtAuthService) {}

//   @Get()
//   @UseGuards(KakaoOauthGuard)
//   async kakaoAuth(@Req() _req) {}

//   @Get('redirect')
//   @UseGuards(KakaoOauthGuard)
//   async kakaoAuthRedirect(@Req() req: Request, @Res() res: Response) {
//     const { accessToken } = this.jwtAuthSerive.login(req.user);
//     res.cookie('jwt', accessToken, {
//       httpOnly: true,
//       sameSite: 'lax',
//     });
//     return req.user;
//   }
// }
