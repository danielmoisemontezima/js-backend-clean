import { Client } from "pg";

export const up = async (db: Client) => {
  await db.query(`
    CREATE TABLE subscriptions (
      id SERIAL PRIMARY KEY,
      external_id UUID NOT NULL DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      duration_days INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

export const down = async (db: Client) => {
  await db.query(`DROP TABLE IF EXISTS subscriptions;`);
};
