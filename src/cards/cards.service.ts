//cards.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async createCard(data) {
    return this.prisma.cards.create({ data });
  }

  async getAllCards(columnId: number) {
    return this.prisma.cards.findMany({ where: { ColumnId: columnId } });
  }

  async getCardById(cardId: number) {
    return this.prisma.cards.findUnique({ where: { cardId } });
  }

  async updateCard(cardId: number, data) {
    return this.prisma.cards.update({ where: { cardId }, data });
  }

  async deleteCard(cardId: number) {
    return this.prisma.cards.delete({ where: { cardId } });
  }
}
