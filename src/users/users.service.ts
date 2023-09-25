import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.users.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );
    createUserDto.password = hashedPassword;

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
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    const user = await this.prisma.users.findUnique({ where: { userId: id } });
    if (!user) {
      throw new Error('User not found');
    }
    return this.prisma.users.update({
      where: { userId: id },
      data: {
        username: updateUserDto.username,
        password: updateUserDto.password,
        email: updateUserDto.email,
      },
    });
  }
  async remove(id: number) {
    const user = await this.prisma.users.findUnique({ where: { userId: id } });
    if (!user) {
      throw new Error('User not found');
    }
    return this.prisma.users.delete({ where: { userId: id } });
  }
}
