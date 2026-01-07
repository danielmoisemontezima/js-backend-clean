import { IDatabaseClient } from "../database/interfaces/IDatabaseClient";
import { Subscription } from "../../domain/entities/subscription.entity";
import { ISubscriptionRepository } from "../../domain/interfaces/ISubscriptionRepository";

export class SubscriptionRepository implements ISubscriptionRepository {
  constructor(private db: IDatabaseClient) {}

  private mapRowToEntity(row: any): Subscription {
    return new Subscription(
      row.id,
      row.external_id,
      row.name,
      row.price,
      row.duration_days,
      row.created_at
    );
  }

  async findAll(): Promise<Subscription[]> {
    const result = await this.db.query(`SELECT * FROM subscriptions`);
    return result.rows.map(row => this.mapRowToEntity(row));
  }

  async findById(id: number): Promise<Subscription | null> {
    const result = await this.db.query(
      `SELECT * FROM subscriptions WHERE id = $1`,
      [id]
    );
    return this.mapRowToEntity(result.rows[0]) || null;
  }

  async create(data: { name: string; price: number; durationDays: number }): Promise<Subscription> {
    const result = await this.db.query(
      `
      INSERT INTO subscriptions (name, price, duration_days)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [data.name, data.price, data.durationDays]
    );
    return this.mapRowToEntity(result.rows[0]);
  }
}