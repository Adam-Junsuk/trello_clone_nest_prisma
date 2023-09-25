// src/columns/columns.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { ColumnsService } from './columns.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

describe('ColumnsService', () => {
  let service: ColumnsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColumnsService, PrismaService],
    }).compile();

    service = module.get<ColumnsService>(ColumnsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('컬럼을 생성하고 반환한다', async () => {
      const createColumnDto: CreateColumnDto = {
        name: '새 컬럼',
        order: 1,
        boardId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createdColumn = {
        columnId: 1,
        name: '새 컬럼',
        order: 1,
        BoardId: 1,
        CreatorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.columns, 'create').mockResolvedValue(createdColumn);

      const result = await service.create(createColumnDto);

      expect(result).toEqual(createdColumn);
    });
  });

  describe('findAll', () => {
    it('모든 컬럼을 반환한다', async () => {
      const columns = [
        {
          columnId: 1,
          name: '컬럼1',
          order: 0, // 추가
          BoardId: 1, // 추가
          CreatorId: 1, // 추가
          createdAt: new Date(), // 추가
          updatedAt: new Date(), // 추가
        },
        {
          columnId: 2,
          name: '컬럼2',
          order: 1, // 추가
          BoardId: 1, // 추가
          CreatorId: 1, // 추가
          createdAt: new Date(), // 추가
          updatedAt: new Date(), // 추가
        },
      ];

      jest.spyOn(prisma.columns, 'findMany').mockResolvedValue(columns);

      const result = await service.findAll();

      expect(result).toEqual(columns);
    });
  });

  describe('findOne', () => {
    it('주어진 ID에 해당하는 컬럼을 반환한다', async () => {
      const column = {
        columnId: 1,
        name: '컬럼1',
        order: 1, // 추가
        BoardId: 1, // 추가
        CreatorId: 1, // 추가
        createdAt: new Date(), // 추가
        updatedAt: new Date(), // 추가
      };

      jest.spyOn(prisma.columns, 'findUnique').mockResolvedValue(column); // 타입 강제 변환

      const result = await service.findOne(1);

      expect(result).toEqual(column);
    });
  });

  describe('update', () => {
    it('주어진 ID에 해당하는 컬럼을 업데이트하고 반환한다', async () => {
      const updateColumnDto: UpdateColumnDto = {
        name: '수정된 컬럼',
        order: 2,
      };

      const updatedColumn = {
        columnId: 1,
        name: 'Updated Column',
        order: 2,
        BoardId: 1,
        CreatorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.columns, 'update').mockResolvedValue(updatedColumn);

      const result = await service.update(1, updateColumnDto);

      expect(result).toEqual(updatedColumn);
    });
  });

  describe('remove', () => {
    it('주어진 ID에 해당하는 컬럼을 삭제한다', async () => {
      const column = {
        columnId: 1,
        name: 'Some Name',
        order: 1,
        BoardId: 1,
        CreatorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.columns, 'delete').mockResolvedValue(column);

      const result = await service.remove(1);

      expect(result).toEqual(column);
    });
  });
});
