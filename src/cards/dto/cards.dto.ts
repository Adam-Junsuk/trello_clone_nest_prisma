//Users/adam/trello_clone_nest_prisma/src/cards/dto/cards.dto.ts

import { IsString, IsOptional } from 'class-validator';

export class CardDto {
  @IsOptional()
  name?: string;

  @IsString()
  description: string;

  @IsOptional()
  color?: string;

  @IsOptional()
  order?: number;

  @IsOptional()
  dueDate?: Date;
}
