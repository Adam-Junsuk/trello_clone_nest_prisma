import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColumnsService {
  constructor(private prisma: PrismaService) {}

  // create a column
  // api/boards/:boardId/columns
  // { "name": "New Column", "order": 1, "boardId": 1 }
  async create(createColumnDto: CreateColumnDto) {
    const { name, order, boardId, userId } = createColumnDto;
    console.log('createColumnDto:', createColumnDto);
    console.log('boardId:', boardId);

    if (!boardId || !userId) {
      throw new Error('boardId or userId is undefined or null');
    }

    if (boardId !== undefined) {
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
      // 1:n = user:columns : 한명의 유저가 여러개의 컬럼을 만들수 있다. 컬럼은 여러명의 유저에 소속될수없다 (한명에 의해서만 만들어질 수 있다.)
      // n:n = users:boards: 여러명의 유저가 여러개의 보드를 만들수 있다. 보드는 여러명의 유저가 소속된다.
      return column;
    } else {
      throw new Error('boardId is undefined');
    }
  }

  // return all columns
  // api/boards/:boardId/columns
  async findAll() {
    return await this.prisma.columns.findMany();
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
