import { Pool } from "pg";
import { databaseConfig } from "../../application/config";

export const db = new Pool({
  connectionString: databaseConfig.url,
  max: databaseConfig.maxConnections,
  ssl: databaseConfig.ssl ? { rejectUnauthorized: false } : false,
});
