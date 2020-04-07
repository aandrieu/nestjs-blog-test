import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Min, Max } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(type => Int)
  @Min(0)
  from = 0;

  @Field(type => Int)
  @Min(1)
  @Max(100)
  take = 25;
}
