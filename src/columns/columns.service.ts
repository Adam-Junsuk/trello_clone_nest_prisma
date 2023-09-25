// trello_clone_nest_prisma/src/columns/columns.service.ts

import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ColumnsService {
  constructor(private prisma: PrismaService) {}
  // create a column
  // api/boards/:boardId/columns
  // { "name": "New Column", "order": 1, "boardId": 1 }
  async create(userId: number, createColumnDto: CreateColumnDto) {
    const { name, order, boardId } = createColumnDto;

    if (!boardId || !userId) {
      throw new NotFoundException('boardId or userId is undefined or null');
    }

    const column = await this.prisma.columns.create({
      data: {
        name,
        order,
        Board: {
          connect: {
            boardId,
          },
        },
        Creator: {
          connect: {
            userId,
          },
        },
      },
    });

    if (!column) {
      throw new NotFoundException('Column could not be created');
    }

    return column;
  }

  // return all columns
  // api/boards/:boardId/columns
  async findAll() {
    return await this.prisma.columns.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }

  // return a single column
  // api/boards/:boardId/columns/:columnId
  async findOne(id: number) {
    return await this.prisma.columns.findUnique({
      where: { columnId: id },
      include: {
        Creator: true,
        Board: true,
      },
    });
  }
  // update a column
  // api/boards/:boardId/columns/:columnId
  async update(id: number, updateColumnDto: UpdateColumnDto) {
    const { name, order } = updateColumnDto;
    return await this.prisma.columns.update({
      where: { columnId: id },
      // where: { Prisma.ColumnWhereUniqueInput} ,
      data: {
        name,
        order,
      },
    });
  }

  // delete a column
  // api/boards/:boardId/columns/:columnId
  async remove(id: number) {
    return await this.prisma.columns.delete({
      where: { columnId: id },
    }); // cascade delete
  }
}
