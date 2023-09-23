import {
  Body,
  Controller,
  // Param,
  Post,
  // Put,
  UseFilters,
  // HttpException,
  // UseGuards,
  // Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
//import { DeleteBoardDto } from './dto/delete-board.dto';!!
//import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { LoginRequsetDto } from 'src/auth/dto/login.request.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller()
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiTags('회원 가입')
  @Post('auth/signup')
  async creatUser(@Body() data: CreateUserDto) {
    await this.usersService.createUser(data);
    return { message: '회원가입이 완료되었습니다.' };
  }

  @ApiTags('로그인')
  @Post('auth/login')
  async login(@Body() data: LoginRequsetDto) {
    return await this.authService.jwtLogin(data);
  }
}
