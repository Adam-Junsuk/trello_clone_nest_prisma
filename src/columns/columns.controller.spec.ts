import { Test, TestingModule } from '@nestjs/testing';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
// import { UsersModule } from 'src/users/users.module';
import { UsersModule } from '../users/users.module';

describe('ColumnsController', () => {
  let controller: ColumnsController;
  let service: ColumnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [ColumnsController],
      providers: [
        {
          provide: ColumnsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ColumnsController>(ColumnsController);
    service = module.get<ColumnsService>(ColumnsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('컬럼을 생성하고 반환한다', async () => {
      const createColumnDto: CreateColumnDto = {
        name: '새 컬럼',
        order: 1,
        boardId: 1,
        userId: 1,
        createdAt: undefined,
        updatedAt: undefined,
      };
      const result = {
        columnId: 1,
        name: '새 컬럼',
        order: 1,
        BoardId: 1,
        CreatorId: 1,
      };

      (service.create as jest.Mock).mockResolvedValue(result);

      expect(await controller.create(createColumnDto)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('모든 컬럼을 반환한다', async () => {
      const result = [
        {
          columnId: 1,
          name: '컬럼1',
          order: 1,
          BoardId: 1,
          CreatorId: 1,
        },
        {
          columnId: 2,
          name: '컬럼2',
          order: 2,
          BoardId: 1,
          CreatorId: 1,
        },
      ];

      (service.findAll as jest.Mock).mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  // findOne, update, remove 등의 테스트도 이어서 작성할 수 있습니다.
});
