//cards.controller.ts
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller('api/columns/:columnId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  createCard(@Param('columnId') columnId: number, @Body() data) {
    return this.cardsService.createCard({ ...data, ColumnId: columnId });
  }

  @Get()
  getAllCards(@Param('columnId') columnId: number) {
    return this.cardsService.getAllCards(columnId);
  }

  @Get(':cardId')
  getCardById(@Param('cardId') cardId: number) {
    return this.cardsService.getCardById(cardId);
  }

  @Put(':cardId')
  updateCard(@Param('cardId') cardId: number, @Body() data) {
    return this.cardsService.updateCard(cardId, data);
  }

  @Delete(':cardId')
  deleteCard(@Param('cardId') cardId: number) {
    return this.cardsService.deleteCard(cardId);
  }
}
