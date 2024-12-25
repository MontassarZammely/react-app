// src/comments/comment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Post } from '../posts/post.entity';
import { User } from '../user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const post = await this.postRepository.findOne({
      where: { id: createCommentDto.postId },
    });
    if (!post) {
      throw new Error('Post not found');
    }
    console.log(createCommentDto);

    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      post,
      user,
    });
    return await this.commentRepository.save(comment);
  }

  async findCommentsByPost(postId: number): Promise<Comment[]> {
    const comment = await this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['user'],
    });
    return comment;
  }

  async updateComment(
    id: number,
    updateCommentDto: UpdateCommentDto,
    user: User,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });
    if (!comment || comment.user.id !== user.id) {
      throw new Error('Comment not found or unauthorized');
    }
    Object.assign(comment, updateCommentDto);
    return await this.commentRepository.save(comment);
  }

  async deleteComment(id: number, user: User): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });
    if (!comment || comment.user.id !== user.id) {
      throw new Error('Comment not found or unauthorized');
    }
    await this.commentRepository.remove(comment);
  }
}
