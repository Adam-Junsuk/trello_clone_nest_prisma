import { PartialType } from '@nestjs/mapped-types'; //dto를 변환시켜줌
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
//UpdateArticleDto는 CreateArticleDto 클래스의 부분집합이다. 라고 선언을 하게 되는 것
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
}
