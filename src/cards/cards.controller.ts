import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardDto } from './dto/cards.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Cards')
@ApiResponse({ status: 500, description: '서버에러' })
@Controller('columns/:columnId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiOperation({ summary: '카드 생성' })
  @ApiResponse({ status: 200, description: '카드가 생성되었습니다.' })
  @Post()
  async create(@Body() createCardDto: CardDto) {
    try {
      await this.cardsService.createCard(createCardDto);
      return { message: '카드가 생성되었습니다.' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { status: 404, message: error.message };
      }
      return { status: 500, message: '서버 에러' };
    }
  }

  @ApiOperation({ summary: '카드 목록 조회' })
  @Get()
  async getAll(@Param('columnId') columnId: number) {
    try {
      const cards = await this.cardsService.getAllCards(columnId);
      return { data: cards };
    } catch (error) {
      return { status: 500, message: '서버 에러' };
    }
  }

  @ApiOperation({ summary: '해당 카드 상세 조회' })
  @Get(':cardId')
  async getById(@Param('cardId') cardId: number) {
    try {
      const card = await this.cardsService.getCardById(cardId);
      return { data: card };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { status: 404, message: error.message };
      }
      return { status: 500, message: '서버 에러' };
    }
  }

  @ApiOperation({ summary: '카드 내용 수정' })
  @ApiResponse({ status: 200, description: '카드가 수정되었습니다.' })
  @Put(':cardId')
  async update(
    @Param('cardId') cardId: number,
    @Body() updateCardDto: CardDto,
  ) {
    try {
      await this.cardsService.updateCard(cardId, updateCardDto);
      return { message: '카드가 수정되었습니다.' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { status: 404, message: error.message };
      }
      return { status: 500, message: '서버 에러' };
    }
  }

  @ApiOperation({ summary: '카드 삭제' })
  @ApiResponse({ status: 200, description: '카드가 삭제되었습니다.' })
  @Delete(':cardId')
  async delete(@Param('cardId') cardId: number) {
    try {
      await this.cardsService.deleteCard(cardId);
      return { message: '카드가 삭제되었습니다.' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { status: 404, message: error.message };
      }
      return { status: 500, message: '서버 에러' };
    }
  }
}
