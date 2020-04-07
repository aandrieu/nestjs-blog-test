import { Injectable, Scope } from '@nestjs/common';

import DataLoader = require('dataloader');

import { PostgresService } from '@app/postgres';
import { createDataLoader } from '../common/dataloader';

import { Tag } from './tag.model';

@Injectable({ scope: Scope.REQUEST })
export class TagsService {
  readonly tagLoader: DataLoader<number, Tag>;

  constructor(private readonly postgresService: PostgresService) {
    this.tagLoader = createDataLoader(ids => this.findByIds(ids));
  }

  private findByIds(ids: ReadonlyArray<number>): Promise<Tag[]> {
    return this.postgresService.sql`
        SELECT * 
        FROM tags
        WHERE id IN (${ids});
      `;
  }
}
