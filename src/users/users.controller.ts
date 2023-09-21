import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  // UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
// import { RemovePasswordInterceptor } from 'src/utils/remove-password.interceptor';

@Controller('users')
// @UseInterceptors(RemovePasswordInterceptor)
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
  @ApiOkResponse({ type: [UserEntity] })
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  // @ApiTags('get a single user')
  @ApiOkResponse({
    type: [UserEntity],
    description: 'The user has been successfully retrieved.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.findOne(id));
  }

  @Put(':id')
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  // 민정님 코드
  // @Patch(':id')
  // async update(@Param('id') userId: number, @Body() data: UpdateUserDto) {
  //   const { username, password, email } = data;
  //   await this.usersService.update({
  //     where: { userId: Number(userId) },
  //     data: { username, password, email },
  //   });
  //   return { message: '유저가 수정되었습니다.' };
  // }

  @Delete(':id')
  // @ApiTags('delete a single user')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.remove(id));
  }
}
