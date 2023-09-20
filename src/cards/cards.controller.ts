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
import { CardDto } from './dto/cards.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(@Body() createCardDto: CardDto) {
    return this.cardsService.createCard(createCardDto);
  }

  @Get(':columnId')
  async getAll(@Param('columnId') columnId: number) {
    return this.cardsService.getAllCards(columnId);
  }

  @Get(':cardId')
  async getById(@Param('cardId') cardId: number) {
    return this.cardsService.getCardById(cardId);
  }

  @Put(':cardId')
  async update(
    @Param('cardId') cardId: number,
    @Body() updateCardDto: CardDto,
  ) {
    return this.cardsService.updateCard(cardId, updateCardDto);
  }

  @Delete(':cardId')
  async delete(@Param('cardId') cardId: number) {
    return this.cardsService.deleteCard(cardId);
  }
}
