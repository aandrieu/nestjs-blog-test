import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { PostgresModule, PostgresService } from '@app/postgres';

import { config } from './config';

import { AppController } from './app.controller';

import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // NEST
    ConfigModule.forRoot({
      ignoreEnvFile: config.env.isProduction,
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: !config.env.isProduction,
      playground: !config.env.isProduction,
    }),

    // LIBS
    PostgresModule,

    // APP MODULES
    CommentsModule,
    PostsModule,
    TagsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [PostgresService],
})
export class AppModule {}
