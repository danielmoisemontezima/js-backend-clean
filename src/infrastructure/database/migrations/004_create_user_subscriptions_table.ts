import { Client } from "pg";

export const up = async (db: Client) => {
  await db.query(`
    CREATE TABLE user_subscriptions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      subscription_id INTEGER NOT NULL REFERENCES subscriptions(id),
      start_date TIMESTAMP NOT NULL,
      end_date TIMESTAMP NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('active', 'expired', 'cancelled')),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

export const down = async (db: Client) => {
  await db.query(`DROP TABLE IF EXISTS user_subscriptions;`);
};