import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.users.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({ where: { userId: id } });
    if (!user) {
      throw new Error('User not found');
    }
    return this.prisma.users.findUnique({ where: { userId: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.users.findUnique({ where: { userId: id } });
    if (!user) {
      throw new Error('User not found');
    }
    return this.prisma.users.update({
      where: { userId: id },
      data: updateUserDto,
    });
  }

  // 민정님 코드
  // async update(params: {
  //   where: Prisma.UsersWhereUniqueInput;
  //   data: Prisma.UsersUpdateInput;
  // }) {
  //   const { data, where } = params;
  //   return this.prisma.users.update({
  //     data,
  //     where,
  //   });
  // }

  async remove(id: number) {
    const user = await this.prisma.users.findUnique({ where: { userId: id } });
    if (!user) {
      throw new Error('User not found');
    }
    return this.prisma.users.delete({ where: { userId: id } });
  }
}
