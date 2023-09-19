// cards.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { PrismaService } from '../prisma.service'; // PrismaService를 import
import { CardsController } from './cards.controller';

describe('CardsController', () => {
  let controller: CardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [CardsService, PrismaService], // PrismaService를 추가
    }).compile();

    controller = module.get<CardsController>(CardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

// CardsService 테스트
describe('CardsService', () => {
  let service: CardsService;
  const mockPrismaService = {
    cards: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        { provide: PrismaService, useValue: mockPrismaService }, // mockPrismaService를 사용
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCard', () => {
    it('should create a card', async () => {
      const cardData = { name: 'Test Card', description: 'Test Description' };
      mockPrismaService.cards.create.mockResolvedValue(cardData);

      const result = await service.createCard(cardData);
      expect(result).toEqual(cardData);
    });
  });

  // 여기에 다른 테스트 케이스를 추가합니다.
});
