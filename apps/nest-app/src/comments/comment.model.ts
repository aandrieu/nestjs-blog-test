import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Post } from '../posts/post.model';
import { User } from '../users/user.model';

@ObjectType()
export class Comment {
  @Field(type => Int)
  readonly id: number;

  readonly content: string;

  readonly post: Post;

  readonly author: User;

  readonly comment: Comment[];
}
