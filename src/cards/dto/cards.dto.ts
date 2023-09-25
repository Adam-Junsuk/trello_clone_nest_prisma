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
