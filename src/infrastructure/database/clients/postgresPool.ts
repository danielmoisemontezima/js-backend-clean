import { Pool } from "pg";
import { databaseConfig } from "../config/database";

export const postgresPool = new Pool({
  connectionString: databaseConfig.url,
  max: databaseConfig.maxConnections,
  ssl: databaseConfig.ssl ? { rejectUnauthorized: false } : false,
});