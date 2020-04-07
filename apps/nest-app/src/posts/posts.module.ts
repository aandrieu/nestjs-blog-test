import { Module } from '@nestjs/common';

import { PostgresService } from '@app/postgres';

import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';

@Module({
  providers: [PostgresService, PostsService, PostsResolver],
})
export class PostsModule {}
