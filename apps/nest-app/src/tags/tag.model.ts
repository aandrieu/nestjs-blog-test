import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Post } from '../posts/post.model';

@ObjectType()
export class Tag {
  @Field(type => Int)
  readonly id: number;

  readonly value: string;

  readonly posts: Post[];
}
