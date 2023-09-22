import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({
    example: 'my board',
    description: 'board name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: '#0000',
    description: 'board color',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly backgroundColor: string;

  @ApiProperty({
    example: 'This board is...',
    required: false,
  })
  @IsString()
  readonly description: string;
}
