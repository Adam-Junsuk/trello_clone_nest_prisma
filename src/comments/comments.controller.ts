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
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CommentEntity } from './entities/comment.entity';

@Controller('comments')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer Token for authentication',
})
@ApiBearerAuth()
@ApiResponse({ status: 500, description: '서버에러' })
@ApiTags('comments')
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
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
  })
  @ApiForbiddenResponse({ description: 'ERROR OCCURED!!' })
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    const comment = await this.commentsService.createComment(createCommentDto);

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
