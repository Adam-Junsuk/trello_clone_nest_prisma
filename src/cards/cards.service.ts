import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CardDto } from './dto/cards.dto';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async createCard(columnId: number, data: CardDto) {
    try {
      console.log(data.description);
      return await this.prisma.cards.create({
        data: {
          ColumnId: columnId,
          name: data.name || 'Unnamed Card', // Default name if not provided
          description: data.description,
          color: data.color || null,
          order: data.order || 0,
        },
      });
    } catch (error) {
      console.log(error.stack);
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
