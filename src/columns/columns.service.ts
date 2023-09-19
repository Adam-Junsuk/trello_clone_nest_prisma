import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('columns')
export class ColumnsService {
  constructor(private prisma: PrismaService) {}

  // create a column
  // api/boards/:boardId/columns
  // { "name": "New Column", "order": 1, "boardId": 1 }
  async create(createColumnDto: CreateColumnDto) {
    const { name, order, boardId } = createColumnDto;
    const column = await this.prisma.columns.create({
      data: {
        name,
        order,
        Board: {
          connect: {
            boardId,
          },
        },
      },
    });
    return column;
  }

  // return all columns
  // api/boards/:boardId/columns
  findAll() {
    return this.prisma.columns.findMany();
  }

  // return a single column
  // api/boards/:boardId/columns/:columnId
  async findOne(id: number) {
    return await this.prisma.columns.findUnique({
      where: { columnId: id },
    });
  }
  // update a column
  // api/boards/:boardId/columns/:columnId
  async update(id: number, updateColumnDto: UpdateColumnDto) {
    const { name, order } = updateColumnDto;
    return await this.prisma.columns.update({
      where: { columnId: id },
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
