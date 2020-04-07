import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as postgres from 'postgres';

@Injectable()
export class PostgresService {
  readonly sql: any;

  constructor(private configService: ConfigService) {
    this.sql = postgres.default(
      this.configService.get<string>('DATABASE_CONNECTION_STRING'),
      {
        debug: (connection, query) => console.log(query),
      },
    );
  }
}
