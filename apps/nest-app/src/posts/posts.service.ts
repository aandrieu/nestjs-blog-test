import { Injectable, Scope } from '@nestjs/common';

import DataLoader = require('dataloader');

import { PostgresService } from '@app/postgres';
import { createDataLoader } from '../common/dataloader';

import { Post } from './post.model';
import { Tag } from '../tags/tag.model';

@Injectable({ scope: Scope.REQUEST })
export class PostsService {
  readonly postLoader: DataLoader<number, Post>;
  readonly postsByTagLoader: DataLoader<Tag, Post>;

  constructor(private readonly postgresService: PostgresService) {
    this.postLoader = createDataLoader(ids => this.findByIds(ids));
    this.postsByTagLoader = createDataLoader(tags => this.findByTags(tags), {
      indexField: 'tag_id',
      cacheKeyFn: tag => tag.id,
      preserveDuplicates: true,
    });
  }

  private findByIds(ids: ReadonlyArray<number>) {
    return this.postgresService.sql`
        SELECT * 
        FROM posts
        WHERE id IN (${ids});
      `;
  }

  private findByTags(tags: ReadonlyArray<Tag>) {
    return this.postgresService.sql`
        SELECT p.*, pt.tag_id
        FROM posts p
        JOIN posts_tags pt ON p.id = pt.post_id
        WHERE pt.tag_id IN (${tags.map(tag => tag.id)});
      `;
  }
}
