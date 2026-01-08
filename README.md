# Database Migrations

Below is a short explanation about migrations, seeders and the database schema.
Make sure you read the prerequisites before running migrations/seeders

```
src/infrastructure/database/migrations/
```

Each migration file contains two functions:

```ts
export const up = async (db) => { /* apply schema changes */ };
export const down = async (db) => { /* rollback schema changes */ };
```

The migration runner automatically:

- Creates a `migrations` tracking table  
- Applies only migrations that have not been executed yet  
- Records each successful migration  
- Supports rolling back migrations in reverse order  
- Prevents duplicate execution even if run multiple times  

---

# Database Model

Below is the logical database model used by the backend.

> ```md
> ![Database Model](./docs/logical-schema-db.png)
> ```
---

## Apply Migrations (UP)

To apply all pending migrations:

```bash
npm run migrate:up
```

This command will:

- Load environment variables (remenber to create .env file) 
- Connect to the database  
- Check which migrations have not been applied  
- Execute them in ascending order  
- Insert each migration name into the `migrations` table  

If you run this command multiple times, previously applied migrations will be skipped automatically.

---

## Roll Back Migrations (DOWN)

To revert previously applied migrations:

```bash
npm run migrate:down
```

This will:

- Reverse the migration order  
- Execute each migration’s `down()` function  
- Remove the migration name from the `migrations` table  

Only migrations that were previously applied will be rolled back.

---
# Database Seeders

All seeders are stored in:

```
src/infrastructure/database/seeders/
```

Each seeder file exports two functions:

```ts
export const up = async (db) => { /* insert data */ };
export const down = async (db) => { /* remove data */ };
```

The seeder runner automatically:

- Creates a `seeders` tracking table  
- Applies only seeders that have not been executed yet  
- Records each successful seeder  
- Supports rolling back seeders in reverse order  
- Prevents duplicate data insertion  

This ensures your database remains consistent and avoids duplicate seed entries.

---

## Apply Seeders (UP)

To run all pending seeders:

```bash
npm run seed:up
```
---

## Roll Back Seeders (DOWN)

To revert previously applied seeders:

```bash
npm run seed:down
```
---
# Environment Setup

Before running the application or executing any database migrations/seeders, you must create a `.env` file in the **root directory** of the project.

This file contains all required environment variables used by the application and the database connection.

Create a new `.env` file:

```
touch .env
```

Then add the required variables:

```env
DB_USER=...
DB_PASSWORD=...
DB_HOST=...
DB_PORT=5432
DB_NAME=...
DB_SSL=false
DB_MAX_CONNECTIONS=10
```

> **Note:**  
> If you are running the application outside of Docker, you may want to set `DB_HOST=localhost` instead of `postgres`.

---

# Starting the PostgreSQL Database

This project includes a Docker Compose setup for running PostgreSQL locally.

After creating your `.env` file, start the database container:

```bash
docker compose up -d
```

This will:

- Launch a PostgreSQL instance  
- Expose it on port `5432`  
- Create the database defined in your `.env`  
- Persist data using a Docker volume  

Once the container is running, you can safely run migrations and seeders.

