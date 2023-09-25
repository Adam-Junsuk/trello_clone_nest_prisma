import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './google-auth.guard';
import { JwtAuthService } from './jwt-auth.service';

@Controller('auth/google')
@UseGuards(GoogleOauthGuard)
export class GoogleOauthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req) {}

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user);
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });
    return req.user;
  }
}
