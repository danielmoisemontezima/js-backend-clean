import { Pool } from "pg";
import { IDatabaseClient } from "../interfaces/IDatabaseClient";

export class PostgresClient implements IDatabaseClient {
  constructor(private pool: Pool) {}

  query(text: string, params?: any[]) {
    return this.pool.query(text, params);
  }
}