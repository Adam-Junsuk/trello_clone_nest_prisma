import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  async board(postWhereUniqueInput: Prisma.BoardsWhereUniqueInput) {
    return this.prisma.boards.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async boards() {
    return this.prisma.boards.findMany({
      select: {
        boardId: true,
        name: true,
      },
    });
  }

  async createBoard(data: Prisma.BoardsCreateInput) {
    return this.prisma.boards.create({
      data,
    });
  }

  async updateBoard(params: {
    where: Prisma.BoardsWhereUniqueInput;
    data: Prisma.BoardsUpdateInput;
  }) {
    const { data, where } = params; //data에 { published: true }, where에  { id: Number(id) }들어감
    return this.prisma.boards.update({
      data,
      where,
    });
  }

  async deleteBoard(where: Prisma.BoardsWhereUniqueInput) {
    return this.prisma.boards.delete({
      where,
    });
  }
}
