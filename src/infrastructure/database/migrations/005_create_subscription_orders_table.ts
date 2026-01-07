import { Client } from "pg";

export const up = async (db: Client) => {
  await db.query(`
    CREATE TABLE subscription_orders (
      id SERIAL PRIMARY KEY,
      external_id UUID NOT NULL DEFAULT gen_random_uuid(),
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      subscription_id INTEGER NOT NULL REFERENCES subscriptions(id),
      status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
      payment_reference TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

export const down = async (db: Client) => {
  await db.query(`DROP TABLE IF EXISTS subscription_orders;`);
};