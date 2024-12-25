import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './posts/post.module';
import { CommentModule } from './comments/comment.module';
// import { FriendshipModule } from './friendship/friendship.module';

@Module({
  imports: [
    // Load .env configuration globally
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available across the app without needing to import it in other modules
    }),

    // Database configuration using environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', 'localhost'), // Default to 'localhost' if not specified
        port: configService.get<number>('DB_PORT', 3306), // Default to 3306 if not specified
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: configService.get<boolean>('DB_SYNC', true), // Sync with entities (use cautiously in production)
      }),
    }),

    // Import user and auth modules
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
  ],
})
export class AppModule {}
