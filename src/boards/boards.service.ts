//adam/trello_clone_nest_prisma/src/boards/boards.service.ts

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

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

  // async boards(userId: number) {
  async boards() {
    console.log('boardsService: boards() 실행');
    return this.prisma.boards.findMany({
      // where: { CreatorId: userId },
      select: {
        boardId: true,
        name: true,
        backgroundColor: true,
        // CreatorId: true,
      },
    });
  }

  async createBoard(userId: number, data: CreateBoardDto) {
    try {
      return await this.prisma.boards.create({
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
    } catch (error) {
      throw new InternalServerErrorException(
        '서비스 - 보드 생성에 실패하였습니다.',
      );
    }
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
