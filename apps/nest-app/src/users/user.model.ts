import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';

import { Post } from '../posts/post.model';
import { Comment } from '../comments/comment.model';

@ObjectType()
export class User {
  @Field(type => Int)
  readonly id: number;

  readonly username: string;

  readonly email: string;

  @HideField()
  readonly password: string;

  readonly comments: Comment[];

  readonly posts: Post[];
}
