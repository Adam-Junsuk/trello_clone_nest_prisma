import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  async board(boardWhereUniqueInput: Prisma.BoardsWhereUniqueInput) {
    return this.prisma.boards.findUnique({
      where: boardWhereUniqueInput,
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

  async createBoard(data: CreateBoardDto, userId) {
    return this.prisma.boards.create({
      data: {
        CreatorId: userId,
        name: data.name,
        backgroundColor: data.backgroundColor,
        description: data.description,
      },
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
