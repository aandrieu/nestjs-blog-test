import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { PostsService } from '../posts/posts.service';
import { Tag } from './tag.model';
import { TagsService } from './tags.service';

@Resolver(of => Tag)
export class TagsResolver {
  constructor(
    private readonly tagsService: TagsService,
    private readonly postsService: PostsService,
  ) {}

  @Query(returns => Tag, { nullable: true })
  tag(@Args('id', { type: () => Int }) id: number) {
    return this.tagsService.tagLoader.load(id);
  }

  @ResolveField('posts')
  posts(@Parent() tag: Tag) {
    return this.postsService.postsByTagLoader.load(tag);
  }
}
