import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardDto } from './dto/cards.dto';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOauthGuard } from 'src/auth-google/google-auth.guard';

@ApiTags('Cards')
@UseGuards(GoogleOauthGuard)
@Controller('columns/:columnId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(@Param('columnId') columnId: number, @Body() data: CardDto) {
    console.log(data);
    try {
      // columnId를 사용하여 로직을 수행할 수 있습니다.
      await this.cardsService.createCard(columnId, data);
      return { message: '카드가 생성되었습니다.' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { status: 404, message: error.message };
      }
      return { status: 500, message: '서버 에러' };
    }
  }

  @Get()
  async getAll(@Param('columnId') columnId: number) {
    try {
      const cards = await this.cardsService.getAllCards(columnId);
      return { data: cards };
    } catch (error) {
      return { status: 500, message: '서버 에러' };
    }
  }

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
