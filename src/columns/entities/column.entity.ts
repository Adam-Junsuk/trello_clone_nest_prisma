import { Columns } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnEntity implements Columns {
  @ApiProperty()
  columnId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  order: number;
  @ApiProperty()
  BoardId: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty({ required: false, nullable: true })
  updatedAt: Date | null;
}
