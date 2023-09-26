import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { Card } from './card.interface';

@Controller('api')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('search')
  async searchCards(@Body('query') query: string): Promise<Card[]> {
    try {
      const results = await this.searchService.searchCards(query);
      console.log(`컨트롤러 리저트${results}`);
      return results;
    } catch (error) {
      console.error('Error searching cards:', error);
      throw new InternalServerErrorException(
        `Failed to search cards in Elasticsearch: ${
          error.message || 'Unknown error'
        }`,
      );
    }
  }
}
