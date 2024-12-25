import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto, req: any): Promise<import("./post.entity").Post>;
    findAllPostsByUser(userId: string): Promise<import("./post.entity").Post[]>;
    findAll(): Promise<import("./post.entity").Post[]>;
    findOne(id: string): Promise<import("./post.entity").Post>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<import("./post.entity").Post>;
    remove(id: string): Promise<void>;
}
