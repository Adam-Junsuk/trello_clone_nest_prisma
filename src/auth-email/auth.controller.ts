import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from '../auth-google/auth.service';
import { SigninDto, SignupDto } from '../users/dtos/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthGuard } from 'src/auth-google/google-auth.guard';

@Controller('auth')
@UseGuards(GoogleOauthGuard)
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Post('/signin/')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }

  //--------------------GOOGLE LOGIN------------------------//
  @Get('/signin/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(@Body() email: string, password: string) {
    this.authService.signin({ email, password });
  }

  @Get('/signin/facebook')
  @UseGuards(AuthGuard('facebook'))
  async loginFacebook(@Body() email: string, password: string) {
    this.authService.signin({ email, password });
  }
}
