import { Client } from "pg";
import { ISubscriptionOrderRepository } from "../../domain/interfaces/ISubscriptionOrderRepository";

export class SubscriptionOrderRepository implements ISubscriptionOrderRepository {
  constructor(private db: Client) {}

  async findById(id: number) {
    const result = await this.db.query(
      `SELECT * FROM subscription_orders WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findPending() {
    const result = await this.db.query(
      `SELECT * FROM subscription_orders WHERE status = 'pending'`
    );
    return result.rows;
  }

  async create(data: {
    userId: number;
    subscriptionId: number;
    status: "pending" | "processing" | "completed" | "failed";
    paymentReference?: string;
  }) {
    const result = await this.db.query(
      `
      INSERT INTO subscription_orders
      (user_id, subscription_id, status, payment_reference)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [
        data.userId,
        data.subscriptionId,
        data.status,
        data.paymentReference || null,
      ]
    );
    return result.rows[0];
  }

  async updateStatus(id: number, status: string) {
    const result = await this.db.query(
      `
      UPDATE subscription_orders
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *;
      `,
      [status, id]
    );
    return result.rows[0];
  }
}