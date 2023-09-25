import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { NotFoundException, BadRequestException } from '@nestjs/common';

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

  async createComment(
    cardId: number,
    userId: number,
    createCommentDto: CreateCommentDto,
  ) {
    const { content } = createCommentDto;

    // 유저와 카드 존재 여부 확인
    const user = await this.prisma.users.findUnique({ where: { userId } });
    const card = await this.prisma.cards.findUnique({ where: { cardId } });

    if (!user || !card) {
      throw new NotFoundException('User or Card not found');
    }

    // 댓글 생성
    try {
      const comment = await this.prisma.comments.create({
        data: {
          content,
          UserId: userId,
          CardId: cardId,
        },
      });
      return comment;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw new BadRequestException('Failed to create comment');
    }
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
