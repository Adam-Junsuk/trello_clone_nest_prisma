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
} from '@nestjs/swagger';
import { CommentEntity } from './entities/comment.entity';
import { Users } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth-basic/jwt-auth.guard';
interface RequestWithUser extends Request {
  user: Users;
}
@Controller('cards/:cardId/comments')
@ApiTags('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiResponse({ type: CommentEntity, isArray: true })
  async getAllComments() {
    const comments = await this.commentsService.getAllComments();
    return comments;
  }

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

  @Get(':id')
  @ApiResponse({ type: CommentEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentsService.findOne(+id);

    if (!comment) {
      throw new NotFoundException(`Could not find comment with ${id}`);
    }
    return comment;
  }

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
