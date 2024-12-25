import { User } from '../user/user.entity';
export declare class Post {
    id: number;
    title: string;
    content: string;
    user: User;
    createdDate: Date;
}
