// src/posts/post.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string = 'Test';

  @Column()
  content: string;

  //src/posts/post.entity.ts
  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  user: User;

  @CreateDateColumn()
  createdDate: Date;
}
