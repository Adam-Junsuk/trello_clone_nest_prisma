import { Columns } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

export class ColumnEntity implements Columns {
  @ApiProperty()
  columnId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  BoardId: number;

  @ApiProperty({ required: false, nullable: true })
  CreatorId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false, nullable: true })
  updatedAt: Date | null;

  // password 필드를 제외한 나머지 필드를 반환
  @ApiProperty({ required: false, type: UserEntity })
  Creator?: UserEntity;

  constructor({ Creator, ...data }: Partial<ColumnEntity>) {
    Object.assign(this, data);

    if (Creator) {
      this.Creator = Creator && new UserEntity(Creator);
    }
  }
}
