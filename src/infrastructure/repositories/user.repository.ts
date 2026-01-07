import { IDatabaseClient } from "../database/interfaces/IDatabaseClient";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
  constructor(private db: IDatabaseClient) {}

  private mapRowToEntity(row: any): User { 
    return new User(
      row.id,
      row.external_id,
      row.email,
      row.password_hash,
      row.name,
      row.created_at,
      row.updated_at
    );
  }

  async findById(id: number): Promise<User | null> {
    const result = await this.db.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );
    return this.mapRowToEntity(result.rows[0]) || null;
  }

  async findByExternalId(externalId: string): Promise<User | null> {
    const result = await this.db.query(
      `SELECT * FROM users WHERE external_id = $1`,
      [externalId]
    );
    return this.mapRowToEntity(result.rows[0]) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return this.mapRowToEntity(result.rows[0]) || null;
  }

  async create(data: { email: string; passwordHash: string; name?: string }): Promise<User> {
    const result = await this.db.query(
      `
      INSERT INTO users (external_id, email, password_hash, name)
      VALUES (gen_random_uuid(), $1, $2, $3)
      RETURNING *;
      `,
      [data.email, data.passwordHash, data.name || null]
    );
    return this.mapRowToEntity(result.rows[0]);
  }
}