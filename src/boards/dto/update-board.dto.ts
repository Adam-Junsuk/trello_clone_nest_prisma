import { PartialType } from '@nestjs/mapped-types'; //dto를 변환시켜줌
import { CreateBoardDto } from './create-board.dto';
import { ApiProperty } from '@nestjs/swagger';
//UpdateArticleDto는 CreateArticleDto 클래스의 부분집합이다. 라고 선언을 하게 되는 것
export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty()
  name: string;
  @ApiProperty()
  backgroundColor: string;
  @ApiProperty()
  description: string;
}
