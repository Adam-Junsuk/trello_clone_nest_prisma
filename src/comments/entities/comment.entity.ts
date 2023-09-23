import { ApiProperty } from '@nestjs/swagger';
import { Comments } from '@prisma/client';

export class CommentEntity implements Comments {
  @ApiProperty()
  UserId: number;

  @ApiProperty()
  commentId: number;

  @ApiProperty()
  CardId: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
