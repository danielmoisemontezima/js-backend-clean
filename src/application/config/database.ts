export interface DatabaseConfig {
  url: string;
  maxConnections: number;
  ssl: boolean;
}

const buildUrl = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const user = process.env.DB_USER;
  const pass = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const name = process.env.DB_NAME;

  return `postgresql://${user}:${pass}@${host}:${port}/${name}`;
};

export const databaseConfig: DatabaseConfig = {
  url: buildUrl(),
  maxConnections: Number(process.env.DB_MAX_CONNECTIONS || 10),
  ssl: process.env.DB_SSL === "true",
};