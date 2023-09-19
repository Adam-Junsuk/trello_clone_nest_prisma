import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly backgroundColor: string;

  @ApiProperty()
  @IsString()
  readonly description: string;
}
