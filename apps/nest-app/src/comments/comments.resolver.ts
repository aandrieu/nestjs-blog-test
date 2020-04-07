import { Resolver, ResolveField } from '@nestjs/graphql';

import { Comment } from './comment.model';

@Resolver(of => Comment)
export class CommentsResolver {}
