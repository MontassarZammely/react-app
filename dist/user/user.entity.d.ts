import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    bio: string;
    profilePicture: string;
    posts: Post[];
    comment: Comment;
    hashPassword(): Promise<void>;
}
