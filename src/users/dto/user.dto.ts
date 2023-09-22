import { ApiProperty } from '@nestjs/swagger';

export class ReadOnlyDto {
  @ApiProperty({
    example: 'ming',
    description: 'username',
  })
  username: string;

  @ApiProperty({
    example: 'ming@gmail.com',
    description: 'email',
  })
  email: string;
}
