import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseFilters,
  ParseIntPipe,
  UseGuards,
  Render,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
// import { JwtAuthGuard } from 'src/auth-basic/jwt-auth.guard';
import { JwtAuthGuard } from '../auth-basic/jwt-auth.guard';
import { HttpExceptionFilter } from '../http-exception.filter'; // minjung's
import { GoogleOauthGuard } from 'src/auth-google/google-auth.guard';


@Controller('users')
@UseFilters(HttpExceptionFilter)
@UseGuards(GoogleOauthGuard)
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    type: UserEntity,
    description: 'The user has been successfully created.',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Get()
  // @Render('users-list')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [UserEntity] })
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: [UserEntity],
    description: 'The user has been successfully retrieved.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.findOne(id));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.remove(id));

    // --Minjung's Code Start
    // import { LoginRequsetDto } from 'src/auth/dto/login.request.dto';
    // import { AuthService } from 'src/auth/auth.service';

    // @Controller()
    // export class UsersController {
    //   constructor(
    //     private readonly usersService: UsersService,
    //     private readonly authService: AuthService,
    //   ) {}

    //   @ApiTags('회원 가입')
    //   @Post('auth/signup')
    //   async creatUser(@Body() data: CreateUserDto) {
    //     await this.usersService.createUser(data);
    //     return { message: '회원가입이 완료되었습니다.' };
    //   }

    //   @ApiTags('로그인')
    //   @Post('auth/login')
    //   async login(@Body() data: LoginRequsetDto) {
    //     return await this.authService.jwtLogin(data);
    // Minjung's Code End
  }
}
