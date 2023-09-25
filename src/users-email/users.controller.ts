import {
  Headers,
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
  NotFoundException,
  UnprocessableEntityException,
  InternalServerErrorException,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-token.dto';
import { UserLoginDto } from './dto/login.dto';
import { UserInfo } from './dto/user-info.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth-email/auth.guard';
import { AuthService } from '../auth-email/auth.service';
import { Response } from 'express';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @Post()
  // async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
  //   try {
  //     const { username, email, password } = createUserDto;
  //     await this.usersService.createUser(username, email, password);
  //   } catch (error) {
  //     if (error instanceof UnprocessableEntityException) {
  //       throw new UnprocessableEntityException(error.message);
  //     }
  //     throw new InternalServerErrorException();
  //   }
  // }

  @Post('/email-verify')
  async verifyEmail(@Query() verifyEmailDto: VerifyEmailDto): Promise<string> {
    try {
      return await this.usersService.verifyEmail(
        verifyEmailDto.signupVerifyToken,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Post('/logine')
  async login(
    @Res() res: Response,
    @Body() loginDto: UserLoginDto,
  ): Promise<void> {
    try {
      const token = await this.usersService.login(
        res,
        loginDto.email,
        loginDto.password,
      );
      res.setHeader('Authorization', `Bearer ${token}`);
      res.send({ message: 'login successful' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
  @UseGuards(AuthGuard)
  @Get('/:userId')
  async getUserInfo(
    @Headers() @Param('userId') headers: any,
    userId: string,
  ): Promise<UserInfo> {
    return this.usersService.getUserInfo(userId);
  }

  @Delete('/:userId')
  async removeUser(@Headers() @Param('userId') userId: string) {
    try {
      return await this.usersService.removeUser(userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
