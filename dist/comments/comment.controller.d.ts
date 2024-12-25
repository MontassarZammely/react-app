import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request } from 'express';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createComment(createCommentDto: CreateCommentDto, req: Request): Promise<import("./comment.entity").Comment>;
    findCommentsByPost(postId: number): Promise<import("./comment.entity").Comment[]>;
    updateComment(id: number, updateCommentDto: UpdateCommentDto, req: any): Promise<import("./comment.entity").Comment>;
    deleteComment(id: number, req: any): Promise<void>;
}
