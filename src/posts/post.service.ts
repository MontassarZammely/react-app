import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const post = this.postRepository.create({
      ...createPostDto,
      user,
    });
    await this.postRepository.save(post);

    return this.postRepository.findOne({
      where: { id: post.id },
      relations: ['user'],
    });
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({ relations: ['user'] });
  }

  async findAllPostsByUser(userId: number): Promise<Post[]> {
    return await this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
