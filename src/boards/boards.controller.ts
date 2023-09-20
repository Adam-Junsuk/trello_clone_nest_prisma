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
//import { DeleteBoardDto } from './dto/delete-board.dto';!!
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiTags('보드 전체조회')
  @Get()
  @ApiOperation({ summary: '해당 유저가 가지고 있는 전체 보드를 조회' })
  async getArticles() {
    return this.boardsService.boards();
  }

  @ApiTags('보드 상세조회')
  @Get('/:boardId')
  @ApiOperation({ summary: '보드의 내용을 상세조회' })
  @ApiResponse({ status: 404, description: '존재하지 않는 Board입니다.' })
  @ApiResponse({ status: 500, description: '서버에러' })
  async getBoardById(@Param('boardId') boardId: number) {
    return this.boardsService.board({ boardId: Number(boardId) });
  }

  @ApiTags('보드 생성')
  @Post()
  @ApiOperation({ summary: '새로운 보드를 생성' })
  @ApiResponse({ status: 200, description: '보드를 생성하였습니다.' })
  @ApiResponse({ status: 500, description: '서버에러' })
  async createBoard(@Body() data: CreateBoardDto) {
    const { name, backgroundColor, description } = data;
    await this.boardsService.createBoard({
      name,
      backgroundColor,
      description,
    });
    return { message: '보드가 생성되었습니다.' };
  }

  @ApiTags('보드 수정')
  @Put('/:boardId')
  @ApiOperation({ summary: '보드의 내용을 수정' })
  @ApiResponse({ status: 200, description: '보드가 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '존재하지 않는 Board입니다.' })
  @ApiResponse({ status: 400, description: '잘못된 데이터 입니다.' })
  @ApiResponse({ status: 500, description: '서버에러.' })
  async updateBoard(
    @Param('boardId') boardId: number,
    @Body() data: UpdateBoardDto,
  ) {
    const { name, backgroundColor, description } = data;
    await this.boardsService.updateBoard({
      where: { boardId: Number(boardId) },
      data: { name, backgroundColor, description },
    });
    return { message: '보드가 수정되었습니다.' };
  }

  @ApiTags('보드삭제')
  @Delete('/:boardId')
  @ApiOperation({ summary: '보드를 삭제' })
  @ApiResponse({ status: 200, description: '보드가 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '존재하지 않는 Board입니다.' })
  @ApiResponse({ status: 500, description: '서버에러.' })
  async deleteBoard(@Param('boardId') boardId: number) {
    await this.boardsService.deleteBoard({ boardId: Number(boardId) });
    return { message: '보드가 삭제되었습니다.' };
  }
}
