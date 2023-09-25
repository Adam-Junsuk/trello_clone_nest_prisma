import {
  Controller,
  Get,
  HttpStatus,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthGuard } from './auth-google/google-auth.guard';

@Controller('auth')
@UseGuards(GoogleOauthGuard)
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}

  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(@Req() req) {}

  // @Get('google/redirect')
  // @UseGuards(AuthGuard('google'))
  // googleAuthRedirect(@Req() req) {
  //   return this.appService.googleLogin(req);
  // }

  // @Get('/facebook')
  // @UseGuards(AuthGuard('facebook'))
  // async facebookLogin(@Req() req) {}

  // @Get('/facebook/redirect')
  // @UseGuards(AuthGuard('facebook'))
  // facebookLoginRedirect(@Req() req) {
  //   return this.appService.facebookLogin(req);
  // }

  // @Get('index')
  // @Render('index')
  // root() {
  //   return { message: 'Hello SeongMin' };
  // }

  // @Get('login')
  // @Render('login')
  // login() {
  //   return;
  // }
}
