///Users/adam/trello_clone_nest_prisma/src/boards/boards.controller.ts

import {
  Body,
  Req,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiHeader,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { Users } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth-basic/jwt-auth.guard';
import {
  BoardListExample,
  BoardDetailedExample,
} from './boards.response.examples';

interface RequestWithUser extends Request {
  user: Users;
}

@ApiTags('boards')
@Controller('boards')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer Token for authentication',
})
@ApiBearerAuth()
@ApiResponse({ status: 500, description: '서버 에러' })
@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({ summary: '해당 유저가 가지고 있는 보드 목록을 조회' })
  @ApiResponse({
    status: 200,
    description: '보드 목록 조회',
    content: {
      examples: BoardListExample,
    },
  })
  @Get()
  async getBoards() {
    return this.boardsService.boards();
  }

  @ApiOperation({ summary: '보드의 내용을 상세조회' })
  @ApiResponse({
    status: 200,
    description: '보드 상세 조회',
    content: {
      examples: BoardDetailedExample,
    },
  })
  @ApiResponse({ status: 404, description: '존재하지 않는 Board입니다.' })
  @Get('/:boardId')
  async getBoardById(@Param('boardId') boardId: string) {
    const board = await this.boardsService.board(boardId);
    if (!board) throw new NotFoundException('존재하지 않는 Board입니다.');
    return board;
  }

  @ApiOperation({ summary: '새로운 보드를 생성' })
  @ApiResponse({ status: 201, description: '보드가 생성되었습니다.' })
  @Post()
  async createBoard(@Req() req: RequestWithUser, @Body() data: CreateBoardDto) {
    const { userId } = req.user;
    const createdBoard = await this.boardsService.createBoard(userId, data);
    if (!createdBoard)
      throw new InternalServerErrorException('보드 생성에 실패하였습니다.');
    return { message: '보드가 생성되었습니다.' };
  }

  @ApiOperation({ summary: '보드의 내용을 수정' })
  @ApiResponse({ status: 200, description: '보드가 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '존재하지 않는 Board입니다.' })
  @Put('/:boardId')
  async updateBoard(
    @Param('boardId') boardId: string,
    @Body() data: UpdateBoardDto,
  ) {
    //const { name, backgroundColor, description } = data;
    const board = await this.boardsService.board(boardId);
    if (!board) throw new NotFoundException('존재하지 않는 Board입니다.');
    await this.boardsService.updateBoard(boardId, data);
    return { message: '보드가 수정되었습니다.' };
  }

  @ApiOperation({ summary: '보드를 삭제' })
  @ApiResponse({ status: 200, description: '보드가 삭제되었습니다.' })
  @ApiResponse({ status: 400, description: '존재하지 않는 Board입니다.' })
  @Delete('/:boardId')
  async deleteBoard(@Param('boardId') boardId: string) {
    const board = await this.boardsService.board(boardId);
    if (!board) throw new NotFoundException('존재하지 않는 Board입니다.');
    await this.boardsService.deleteBoard(boardId);
    return { message: '보드가 삭제되었습니다.' };
  }
}
