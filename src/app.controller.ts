import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('google')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}


  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req){
    return this.appService.googleLogin(req)
  }

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/signin')
  // async signin(@new Request() req){
  //   return req.user;
  // }
  // getHello(): string {
  //   return this.appService.getHello();
  }

