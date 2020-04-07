import { Resolver } from '@nestjs/graphql';
import { User } from './user.model';

@Resolver(of => User)
export class UsersResolver {}
