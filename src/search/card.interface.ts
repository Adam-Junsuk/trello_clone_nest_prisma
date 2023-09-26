// Card 인터페이스 정의
export interface Card {
  cardId: number;
  ColumnId: number;
  name: string;
  description: string;
  color: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date | null;
}
export interface ElasticsearchHit<T> {
  _index: string;
  _id: string;
  _score: number;
  _source: T;
}

export interface ElasticsearchResponse<T> {
  took: number;
  timed_out: boolean;
  _shards: {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
  };
  hits: {
    total: {
      value: number;
      relation: string;
    };
    max_score: number;
    hits: ElasticsearchHit<T>[];
  };
}

// SearchResponse 인터페이스 정의
export interface SearchResponse<T> {
  took: number;
  timed_out: boolean;
  _shards: {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
  };
  hits: {
    total: {
      value: number;
      relation: string;
    };
    max_score: number | null;
    hits: Array<{
      _index: string;
      _type: string;
      _id: string;
      _score: number | null;
      _source: T;
    }>;
  };
}
