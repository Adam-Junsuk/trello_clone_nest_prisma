import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  content: string;

  @ApiProperty()
  @IsNumber()
  cardId: number;

  @ApiProperty()
  @IsNumber()
  userId: number;

  // @IsDate()
  createdAt: Date;

  // @IsDate()
  updatedAt: Date;
}
