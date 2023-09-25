import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  content: string;

  // @IsDate()
  createdAt: Date;

  // @IsDate()
  updatedAt: Date;
}
