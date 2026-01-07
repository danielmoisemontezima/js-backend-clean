import { Client } from "pg";

export const up = async (db: Client) => {
  await db.query(`
    INSERT INTO users (external_id, email, password_hash, name)
    VALUES
      (gen_random_uuid(), 'alice@example.com', 'hashed_password_1', 'Alice'),
      (gen_random_uuid(), 'bob@example.com', 'hashed_password_2', 'Bob'),
      (gen_random_uuid(), 'charlie@example.com', 'hashed_password_3', 'Charlie');
  `);
};

export const down = async (db: Client) => {
  await db.query(`
    DELETE FROM users
    WHERE email IN ('alice@example.com', 'bob@example.com', 'charlie@example.com');
  `);
};