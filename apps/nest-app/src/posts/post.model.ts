import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Comment } from '../comments/comment.model';
import { Tag } from '../tags/tag.model';
import { User } from '../users/user.model';

@ObjectType()
export class Post {
  @Field(type => Int)
  readonly id: number;

  readonly title: string;

  readonly content: string;

  readonly author: User;

  readonly comments: Comment[];

  readonly tags: Tag[];
}
