export interface DatabaseConfig {
  url: string;
  maxConnections: number;
  ssl: boolean;
}

const buildUrl = () => {
  if (process.env.PG_DATABASE_URL) {
    return process.env.PG_DATABASE_URL;
  }

  const user = process.env.PG_DB_USER;
  const pass = process.env.PG_DB_PASSWORD;
  const host = process.env.PG_DB_HOST;
  const port = process.env.PG_DB_PORT;
  const name = process.env.PG_DB_NAME;

  return `postgresql://${user}:${pass}@${host}:${port}/${name}`;
};

export const databaseConfig: DatabaseConfig = {
  url: buildUrl(),
  maxConnections: Number(process.env.PG_DB_MAX_CONNECTIONS || 10),
  ssl: process.env.PG_DB_SSL === "true",
};