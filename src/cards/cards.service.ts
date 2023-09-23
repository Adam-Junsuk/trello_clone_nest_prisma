import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async createCard(data) {
    try {
      return await this.prisma.cards.create({ data });
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
        include: { Users: true },
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
