import { Client } from "pg";

export const up = async (db: Client) => {
  await db.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
};

export const down = async (db: Client) => {
  await db.query(`DROP EXTENSION IF EXISTS "pgcrypto";`);
};
