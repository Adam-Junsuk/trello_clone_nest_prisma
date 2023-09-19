import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({
    example: 'New Column',
  })
  name: string;

  @ApiProperty({
    example: 1,
  })
  order: number;

  @ApiProperty({
    example: 1,
  })
  boardId: number;

  @ApiProperty({
    example: 1,
  })
  userId: number;

  @ApiProperty({
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  deletedAt: Date;
}
