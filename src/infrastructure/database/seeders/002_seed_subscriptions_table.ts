import { Client } from "pg";

export const up = async (db: Client) => {
  await db.query(`
    INSERT INTO subscriptions (external_id, name, price, duration_days)
    VALUES
      (gen_random_uuid(), 'Basic', 9.99, 30),
      (gen_random_uuid(), 'Pro', 19.99, 30),
      (gen_random_uuid(), 'Premium', 49.99, 90);
  `);
};

export const down = async (db: Client) => {
  await db.query(`
    DELETE FROM subscriptions
    WHERE name IN ('Basic', 'Pro', 'Premium');
  `);
};