import dotenv from "dotenv";
dotenv.config();

import { db } from "./client";
import fs from "fs";
import path from "path";

async function ensureMigrationsTable(client: any) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      run_on TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
}

async function runMigrations(direction: "up" | "down") {
  const client = await db.connect();

  try {
    await ensureMigrationsTable(client);

    const migrationsDir = path.join(__dirname, "migrations");
    let files = fs.readdirSync(migrationsDir).sort();

    // Reverse order for DOWN
    if (direction === "down") {
      files = files.reverse();
    }

    for (const file of files) {
      const migrationName = file;

      // Check if migration already ran
      const result = await client.query(
        "SELECT 1 FROM migrations WHERE name = $1",
        [migrationName]
      );

      if (direction === "up" && result.rows.length > 0) {
        console.log(`Skipping already applied migration: ${migrationName}`);
        continue;
      }

      if (direction === "down" && result.rows.length === 0) {
        console.log(`Skipping rollback (not applied): ${migrationName}`);
        continue;
      }

      // Run migration
      const migration = await import(path.join(migrationsDir, file));
      console.log(`Running migration ${direction}: ${migrationName}`);
      await migration[direction](client);

      // Record or remove migration
      if (direction === "up") {
        await client.query(
          "INSERT INTO migrations (name) VALUES ($1)",
          [migrationName]
        );
      } else {
        await client.query(
          "DELETE FROM migrations WHERE name = $1",
          [migrationName]
        );
      }
    }

    console.log(`Migrations ${direction} completed`);
  } finally {
    client.release();
  }
}

// Read CLI argument
const direction = process.argv[2] as "up" | "down";

if (!direction || !["up", "down"].includes(direction)) {
  console.error('Usage: ts-node migrationRunner.ts <up|down>');
  process.exit(1);
}

runMigrations(direction);