import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('comments')
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  getAllComments() {
    return this.prisma.comments.findMany({
      select: {
        commentId: true,
        content: true,
      },
    });
  }
  async findOne(id: number) {
    return this.prisma.comments.findUnique({
      where: { commentId: +id },
    });
  }

  async createComment(createCommentDto: CreateCommentDto) {
    const { content, cardId, userId } = createCommentDto;

    const comment = await this.prisma.comments.create({
      data: {
        content,

        Card: {
          connect: {
            cardId,
          },
        },
        User: {
          connect: {
            userId,
          },
        },
      },
    });

    return comment;
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    const { content } = updateCommentDto;
    return await this.prisma.comments.update({
      where: { commentId: +id },
      data: {
        content,
      },
    });
  }
  async deleteComment(id: number) {
    return await this.prisma.comments.delete({
      where: { commentId: id },
    });
  }
}
