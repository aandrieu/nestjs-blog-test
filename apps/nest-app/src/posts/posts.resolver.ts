import { Resolver, Args, Int, Query, ResolveField } from '@nestjs/graphql';

import { Comment } from '../comments/comment.model';
import { Post } from './post.model';
import { Tag } from '../tags/tag.model';
import { User } from '../users/user.model';

@Resolver(of => Post)
export class PostsResolver {
  @Query(returns => Post)
  async post(@Args('id', { type: () => Int }) id: number) {
    return {
      id,
      title: 'Hello world!',
      content: 'My first blog post',
    };
  }

  @ResolveField('author')
  async author() {
    return {
      id: 1,
      username: 'toto',
      email: 'toto',
      password: 'toto',
    };
  }

  @ResolveField('comments')
  async comments() {
    return [];
  }

  @ResolveField('tags')
  async tags() {
    return [];
  }
}
