import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/user/user.entity';
export declare class PostService {
    private readonly postRepository;
    constructor(postRepository: Repository<Post>);
    createPost(createPostDto: CreatePostDto, user: User): Promise<Post>;
    findAll(): Promise<Post[]>;
    findAllPostsByUser(userId: number): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    update(id: number, updatePostDto: UpdatePostDto): Promise<Post>;
    remove(id: number): Promise<void>;
}
