import { Client } from "pg";

export const up = async (db: Client) => {
  await db.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      external_id UUID NOT NULL DEFAULT gen_random_uuid(),
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

export const down = async (db: Client) => {
  await db.query(`DROP TABLE IF EXISTS users;`);
};