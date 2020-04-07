import { Module } from '@nestjs/common';

import { PostgresService } from '@app/postgres';

import { PostsService } from '../posts/posts.service';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';

@Module({
  providers: [PostgresService, PostsService, TagsService, TagsResolver],
})
export class TagsModule {}
