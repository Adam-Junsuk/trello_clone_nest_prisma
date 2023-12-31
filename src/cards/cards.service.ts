//Users/adam/trello_clone_nest_prisma/src/cards/cards.service.ts
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CardDto } from './dto/cards.dto';
import { SearchService } from '../search/search.service'; // SearchService import

@Injectable()
export class CardsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly searchService: SearchService, // SearchService 주입
  ) {}

  // src/cards/cards.service.ts
  async createCard(columnId: number, data: CardDto) {
    try {
      const createdCard = await this.prisma.cards.create({
        data: {
          ColumnId: columnId,
          name: data.name || 'Unnamed Card',
          description: data.description,
          color: data.color || null,
          order: data.order || 0,
        },
      });

      try {
        const response = await this.searchService.indexCard(createdCard);
        console.log('Elasticsearch response:', response);
      } catch (error) {
        console.error('Elasticsearch index error:', error.message, error.stack);
        throw new InternalServerErrorException(
          'Failed to index card in Elasticsearch',
        );
      }

      return createdCard;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('존재하지 않는 컬럼입니다.');
      }
      throw new InternalServerErrorException('서버 에러');
    }
  }

  async getAllCards(columnId: number) {
    try {
      return await this.prisma.cards.findMany({
        where: { ColumnId: columnId },
      });
    } catch (error) {
      throw new InternalServerErrorException('서버 에러');
    }
  }

  async getCardById(cardId: number) {
    try {
      const card = await this.prisma.cards.findUnique({
        where: { cardId },
        include: {
          Comments: {
            include: {
              User: {
                select: {
                  userId: true,
                  username: true,
                },
              },
            },
          },
          Column: true,
          CardUsers: {
            // Include CardUsers to get the relation between Cards and Users
            include: {
              User: {
                // Include Users related to this card
                select: {
                  userId: true,
                  username: true, // Include username or any other fields you need
                },
              },
            },
          },
        },
      });
      if (!card) {
        throw new NotFoundException('존재하지 않는 Card입니다.');
      }
      return card;
    } catch (error) {
      throw new InternalServerErrorException('서버 에러');
    }
  }

  async updateCard(cardId: number, data) {
    try {
      const updatedCard = await this.prisma.cards.update({
        where: { cardId },
        data,
      });
      if (!updatedCard) {
        throw new NotFoundException('존재하지 않는 Card입니다.');
      }
      return updatedCard;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('존재하지 않는 Card입니다.');
      }
      throw new InternalServerErrorException('서버 에러');
    }
  }

  async deleteCard(cardId: number) {
    try {
      const deletedCard = await this.prisma.cards.delete({ where: { cardId } });
      if (!deletedCard) {
        throw new NotFoundException('존재하지 않는 Card입니다.');
      }
      return deletedCard;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('존재하지 않는 Card입니다.');
      }
      throw new InternalServerErrorException('서버 에러');
    }
  }
}
