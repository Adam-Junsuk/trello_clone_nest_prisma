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
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { AuthService } from 'src/auth-basic/auth.service';
import { Users } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth-basic/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: Users;
}

@Controller('boards')
@UseFilters(HttpExceptionFilter)
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly authService: AuthService,
  ) {}

  @ApiTags('보드 전체조회')
  @ApiOperation({ summary: '해당 유저가 가지고 있는 전체 보드를 조회' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getArticles(@Req() req: RequestWithUser) {
    req.user;
    return this.boardsService.boards();
  }

  @ApiTags('보드 상세조회')
  @ApiOperation({ summary: '보드의 내용을 상세조회' })
  @ApiResponse({ status: 404, description: '존재하지 않는 Board입니다.' })
  @ApiResponse({ status: 500, description: '서버에러' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/:boardId')
  async getBoardById(@Param('boardId') boardId: string) {
    const board = await this.boardsService.board(boardId);
    if (!board) throw new HttpException('존재하지 않는 board입니다.', 404);
    return board;
  }

  @ApiTags('보드 생성')
  @ApiOperation({ summary: '새로운 보드를 생성' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async createBoard(@Req() req: RequestWithUser, @Body() data: CreateBoardDto) {
    const { userId } = req.user;
    await this.boardsService.createBoard(userId, data);
    return { message: '보드가 생성되었습니다.' };
  }

  @ApiTags('보드 수정')
  @ApiOperation({ summary: '보드의 내용을 수정' })
  @ApiResponse({ status: 200, description: '보드가 수정되었습니다.' })
  @ApiResponse({ status: 404, description: '존재하지 않는 Board입니다.' })
  @ApiResponse({ status: 400, description: '잘못된 데이터 입니다.' })
  @ApiResponse({ status: 500, description: '서버에러.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('/:boardId')
  async updateBoard(
    @Param('boardId') boardId: string,
    @Body() data: UpdateBoardDto,
  ) {
    //const { name, backgroundColor, description } = data;
    const board = await this.boardsService.board(boardId);
    if (!board) throw new HttpException('존재하지 않는 board입니다.', 404);
    await this.boardsService.updateBoard(boardId, data);
    return { message: '보드가 수정되었습니다.' };
  }

  @ApiTags('보드삭제')
  @ApiOperation({ summary: '보드를 삭제' })
  @ApiResponse({ status: 200, description: '보드가 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '존재하지 않는 Board입니다.' })
  @ApiResponse({ status: 500, description: '서버에러.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/:boardId')
  async deleteBoard(@Param('boardId') boardId: string) {
    const board = await this.boardsService.board(boardId);
    if (!board) throw new HttpException('존재하지 않는 board입니다.', 404);
    await this.boardsService.deleteBoard(boardId);
    return { message: '보드가 삭제되었습니다.' };
  }
}
