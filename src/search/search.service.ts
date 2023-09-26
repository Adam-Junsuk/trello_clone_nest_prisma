import { Client } from '@elastic/elasticsearch';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Card } from './card.interface';
// Elasticsearch 응답 형식에 대한 인터페이스 정의

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexCard(card: Card) {
    // card: Card로 변경
    try {
      const createdAt = new Date(card.createdAt).toISOString();
      const updatedAt = new Date(card.updatedAt).toISOString();
      const dueDate = card.dueDate
        ? new Date(card.dueDate).toISOString()
        : null;

      const response = await this.elasticsearchService.index({
        index: 'cards',
        id: String(card.cardId),
        body: {
          ...card,
          createdAt,
          updatedAt,
          dueDate,
        },
      });

      return response;
    } catch (error) {
      console.error('Error indexing card:', error.message, error.stack);
      throw new InternalServerErrorException(
        'Failed to index card in Elasticsearch',
      );
    }
  }

  async searchCards(query: string): Promise<any> {
    // Elasticsearch 클라이언트 생성
    const client = new Client({
      node: 'http://localhost:9200',
      auth: {
        username: 'elastic',
        password: 'lNjMGlK6IzDoRqg-WKoL',
      },
    });

    try {
      const response = (await client.search({
        index: 'cards',
        body: {
          query: {
            bool: {
              should: [
                {
                  match: {
                    name: query,
                  },
                },
                {
                  match: {
                    description: query,
                  },
                },
              ],
            },
          },
        },
      })) as any;

      // 새로운 로직: Elasticsearch 응답을 처리
      if (response && response.hits && response.hits.hits) {
        const hits = response.hits.hits;

        const cards: Card[] = hits.map((hit) => hit._source);

        return cards;
      } else {
        throw new Error('Unexpected Elasticsearch response format');
      }
    } catch (error) {
      console.error('Error searching cards:', error.message);
      throw new InternalServerErrorException(
        'Failed to search cards in Elasticsearch',
      );
    }
  }
}
