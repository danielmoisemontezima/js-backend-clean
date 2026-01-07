import { Client } from "pg";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
  constructor(private db: Client) {}

  async findById(id: number) {
    const result = await this.db.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findByExternalId(externalId: string) {
    const result = await this.db.query(
      `SELECT * FROM users WHERE external_id = $1`,
      [externalId]
    );
    return result.rows[0] || null;
  }

  async findByEmail(email: string) {
    const result = await this.db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  }

  async create(data: { email: string; passwordHash: string; name?: string }) {
    const result = await this.db.query(
      `
      INSERT INTO users (external_id, email, password_hash, name)
      VALUES (gen_random_uuid(), $1, $2, $3)
      RETURNING *;
      `,
      [data.email, data.passwordHash, data.name || null]
    );
    return result.rows[0];
  }
}