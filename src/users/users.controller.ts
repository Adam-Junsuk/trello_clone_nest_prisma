import {
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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-token.dto';
import { UserLoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    try {
      const { username, email, password } = createUserDto;
      await this.usersService.createUser(username, email, password);
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw new UnprocessableEntityException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

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

  @Post('/login')
  async login(@Body() loginDto: UserLoginDto): Promise<string> {
    try {
      return await this.usersService.login(loginDto.email, loginDto.password);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Get('/:userId')
  async getUserInfo(@Param('userId') userId: string) {
    try {
      return await this.usersService.getUserInfo(userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Delete('/:userId')
  async removeUser(@Param('userId') userId: string) {
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
