import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';

// import { Friendship } from 'src/friendship/friendship.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  @Length(0, 250)
  bio: string;

  @Column({ nullable: true })
  profilePicture: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, { onDelete: 'CASCADE' })
  comment: Comment;
  // @OneToMany(() => Friendship, (friendship) => friendship.sender)
  // sentFriendRequests: Friendship[];

  // @OneToMany(() => Friendship, (friendship) => friendship.receiver)
  // receivedFriendRequests: Friendship[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
