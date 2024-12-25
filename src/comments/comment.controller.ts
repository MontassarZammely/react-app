// src/comments/comment.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: Request,
  ) {
    return await this.commentService.createComment(
      createCommentDto,
      req.user as any,
    );
  }

  @Get('post/:postId')
  async findCommentsByPost(@Param('postId') postId: number) {
    return await this.commentService.findCommentsByPost(postId);
  }

  @Put(':id')
  async updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req,
  ) {
    return await this.commentService.updateComment(
      id,
      updateCommentDto,
      req.user,
    );
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number, @Req() req) {
    await this.commentService.deleteComment(id, req.user);
  }
}
