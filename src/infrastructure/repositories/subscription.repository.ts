import { Client } from "pg";
import { ISubscriptionRepository } from "../../domain/interfaces/ISubscriptionRepository";

export class SubscriptionRepository implements ISubscriptionRepository {
  constructor(private db: Client) {}

  async findAll() {
    const result = await this.db.query(`SELECT * FROM subscriptions`);
    return result.rows;
  }

  async findById(id: number) {
    const result = await this.db.query(
      `SELECT * FROM subscriptions WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async create(data: { name: string; price: number; durationDays: number }) {
    const result = await this.db.query(
      `
      INSERT INTO subscriptions (name, price, duration_days)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [data.name, data.price, data.durationDays]
    );
    return result.rows[0];
  }
}