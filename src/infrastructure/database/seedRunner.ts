import dotenv from "dotenv";
dotenv.config();

import { db } from "./client";
import fs from "fs";
import path from "path";

async function ensureSeedersTable(client: any) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS seeders (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      run_on TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
}

async function runSeeders(direction: "up" | "down") {
  const client = await db.connect();

  try {
    await ensureSeedersTable(client);

    const seedersDir = path.join(__dirname, "seeders");
    let files = fs.readdirSync(seedersDir).sort();

    // Reverse order for DOWN
    if (direction === "down") {
      files = files.reverse();
    }

    for (const file of files) {
      const seederName = file;

      // Check if seeder already ran
      const result = await client.query(
        "SELECT 1 FROM seeders WHERE name = $1",
        [seederName]
      );

      if (direction === "up" && result.rows.length > 0) {
        console.log(`Skipping already applied seeder: ${seederName}`);
        continue;
      }

      if (direction === "down" && result.rows.length === 0) {
        console.log(`Skipping rollback (not applied): ${seederName}`);
        continue;
      }

      // Run seeder
      const seeder = await import(path.join(seedersDir, file));
      console.log(`Running seeder ${direction}: ${seederName}`);
      await seeder[direction](client);

      // Record or remove seeder
      if (direction === "up") {
        await client.query(
          "INSERT INTO seeders (name) VALUES ($1)",
          [seederName]
        );
      } else {
        await client.query(
          "DELETE FROM seeders WHERE name = $1",
          [seederName]
        );
      }
    }

    console.log(`Seeders ${direction} completed`);
  } finally {
    client.release();
  }
}

// Read CLI argument
const direction = process.argv[2] as "up" | "down";

if (!direction || !["up", "down"].includes(direction)) {
  console.error('Usage: ts-node seederRunner.ts <up|down>');
  process.exit(1);
}

runSeeders(direction);