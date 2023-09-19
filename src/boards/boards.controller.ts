import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
//import { DeleteBoardDto } from './dto/delete-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  //보드전체조회
  @Get()
  async getArticles() {
    return this.boardsService.boards();
  }

  //보드하나조회
  @Get('/:boardId')
  async getBoardById(@Param('boardId') boardId: number) {
    return this.boardsService.board({ boardId: Number(boardId) });
  }

  //보드생성
  @Post()
  async createBoard(@Body() data: CreateBoardDto) {
    const { name, backgroundColor, description } = data;
    return this.boardsService.createBoard({
      name,
      backgroundColor,
      description,
    });
  }

  //보드수정
  @Put('/:boardId')
  async updateBoard(
    @Param('boardId') boardId: number,
    @Body() data: UpdateBoardDto,
  ) {
    const { name, backgroundColor, description } = data;
    return this.boardsService.updateBoard({
      where: { boardId: Number(boardId) },
      data: { name, backgroundColor, description },
    });
  }

  //보드삭제
  @Delete('/:boardId')
  async deleteBoard(@Param('boardId') boardId: number) {
    return this.boardsService.deleteBoard({ boardId: Number(boardId) });
  }
}
