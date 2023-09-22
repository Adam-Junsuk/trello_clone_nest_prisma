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
import { LoginUserDto } from './dto/login-user.dto';
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
  async login(@Body() data: LoginUserDto) {
    return await this.authService.jwtLogin(data);
  }

  //   @ApiTags('사용자 정보 수정')
  //   @Put('users/:userId')
  //   async updateBoard(
  //     @Param('userId') userId: number,
  //     @Body() data: UpdateUserDto,
  //   ) {
  //     const { username, email } = data;
  //     const user = await this.usersService.user({ boardId: Number(boardId) });
  //     if (!user) throw new HttpException('사용자가 존재하지 않습니다..', 404);
  //     await this.usersService.updateUser({
  //       where: { userId: Number(userId) },
  //       data: { username, email },
  //     });
  //     return { message: '사용자 정보가 수정되었습니다.' };
  //   }
  //   @ApiTags('로그아웃')
  //   @Post('users/logout')
  //   async logoutUser() {
  //     return { message: 'sucess' };
  //   }
}
