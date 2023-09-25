//adam/trello_clone_nest_prisma/src/boards/boards.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  async board(boardId: string) {
    return this.prisma.boards.findUnique({
      where: { boardId: +boardId },
      include: {
        Columns: {
          include: {
            Cards: true,
          },
        },
      },
    });
  }

  async boards() {
    return this.prisma.boards.findMany({
      select: {
        boardId: true,
        name: true,
        // CreatorId: true,
      },
    });
  }

  async createBoard(userId: number, data: CreateBoardDto) {
    return this.prisma.boards.create({
      data: {
        name: data.name,
        backgroundColor: data.backgroundColor,
        description: data.description,
        Creator: {
          connect: {
            userId,
          },
        },
      },
    });
  }

  async updateBoard(boardId: string, data: UpdateBoardDto) {
    return this.prisma.boards.update({
      data: {
        name: data.name,
        backgroundColor: data.backgroundColor,
        description: data.description,
      },
      where: { boardId: +boardId },
    });
  }

  async deleteBoard(boardId: string) {
    return this.prisma.boards.delete({
      where: { boardId: +boardId },
    });
  }
}
