import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
export class CreateColumnDto {
  @ApiProperty({
    example: 'New Column',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  readonly name: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  readonly order: number;

  @ApiProperty({
    example: 1,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsNotEmpty()
  readonly boardId: number;

  @ApiProperty({
    example: 1,
  })
  @ApiProperty({
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  deletedAt: Date;
}
