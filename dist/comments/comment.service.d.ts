import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Post } from '../posts/post.entity';
import { User } from '../user/user.entity';
export declare class CommentService {
    private readonly commentRepository;
    private readonly postRepository;
    constructor(commentRepository: Repository<Comment>, postRepository: Repository<Post>);
    createComment(createCommentDto: CreateCommentDto, user: User): Promise<Comment>;
    findCommentsByPost(postId: number): Promise<Comment[]>;
    updateComment(id: number, updateCommentDto: UpdateCommentDto, user: User): Promise<Comment>;
    deleteComment(id: number, user: User): Promise<void>;
}
