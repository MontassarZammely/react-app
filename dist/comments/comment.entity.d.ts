import { User } from '../user/user.entity';
import { Post } from '../posts/post.entity';
export declare class Comment {
    id: number;
    content: string;
    user: User;
    post: Post;
    createdDate: Date;
}
