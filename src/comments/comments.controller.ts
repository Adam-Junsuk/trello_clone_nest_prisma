import {
  Controller,
  Post,
  Body,
  NotFoundException,
  Param,
  Delete,
  Get,
  Patch,
  ParseIntPipe,
  Req,

  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CommentEntity } from './entities/comment.entity';
import { GoogleOauthGuard } from 'src/auth-google/google-auth.guard';
import { Users } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth-basic/jwt-auth.guard';
interface RequestWithUser extends Request {
  user: Users;
}

@ApiHeader({
  name: 'Authorization',
  description: 'Bearer Token for authentication',
})
@ApiBearerAuth()
@ApiResponse({ status: 500, description: '서버에러' })
@Controller('cards/:cardId/comments')
@ApiTags('comments')
@UseGuards(GoogleOauthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '해당 카드에 있는 댓글 목록 조회' })
  @Get()
  @ApiResponse({ type: CommentEntity, isArray: true })
  async getAllComments() {
    const comments = await this.commentsService.getAllComments();
    return comments;
  }

  @ApiOperation({ summary: '댓글 작성' })
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
  })
  @ApiForbiddenResponse({ description: 'ERROR OCCURED!!' })
  async createComment(
    @Req() req: RequestWithUser,
    @Param('cardId') cardId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const { userId } = req.user;
    const comment = await this.commentsService.createComment(
      cardId,
      userId,
      createCommentDto,
    );

    if (!comment) {
      throw new NotFoundException('Comment not created');
    }

    return comment;
  }

  @ApiOperation({ summary: '댓글 상세 조회' })
  @Get(':id')
  @ApiResponse({ type: CommentEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentsService.findOne(+id);

    if (!comment) {
      throw new NotFoundException(`Could not find comment with ${id}`);
    }
    return comment;
  }

  @ApiOperation({ summary: '댓글 수정' })
  @Patch(':id')
  @ApiResponse({ type: CommentEntity })
  @ApiCreatedResponse({ description: 'successfully updated to a new one!!' })
  @ApiForbiddenResponse({
    description: 'Unfortunately, you have been failed to update the comment.',
  })
  async updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.commentsService.findOne(id);

    if (!comment) {
      throw new NotFoundException(`Target Comment with id ${id} not found`);
    }
    return await this.commentsService.updateComment(+id, updateCommentDto);
  }

  @ApiOperation({ summary: '댓글 삭제' })
  @Delete(':id')
  @ApiResponse({ type: CommentEntity })
  @ApiCreatedResponse({ description: 'Successfully deleted!' })
  @ApiForbiddenResponse({ description: 'Unfortunately, failed!' })
  async deleteComment(@Param('id') id: number) {
    const comment = await this.commentsService.findOne(+id);

    if (!comment) {
      throw new NotFoundException(`Target Comment with id ${id} not found`);
    }
    return await this.commentsService.deleteComment(+id);
  }
}
