// import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
// import { JwtAuthService } from 'src/auth-google/jwt-auth.service';
// import { FacebookOauthGuard } from './facebook-auth.guard';
// import { Request, Response } from 'express';

// @Controller('auth/facebook')
// export class FacebookOauthController {
//   constructor(private jwtAuthService: JwtAuthService) {}

//   @Get()
//   @UseGuards(FacebookOauthGuard)
//   async facebookAuth(@Req() _req) {}

//   @Get('redirect')
//   @UseGuards(FacebookOauthGuard)
//   async facebookAuthRedirect(@Req() req: Request, @Res() res: Response) {
//     const { accessToken } = this.jwtAuthService.login(req.user);
//     res.cookie('jwt', accessToken, {
//       httpOnly: true,
//       sameSite: 'lax',
//     });
//     return req.user;
//   }
// }
