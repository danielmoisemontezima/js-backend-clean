import { Client } from "pg";
import { IUserSubscriptionRepository } from "../../domain/interfaces/IUserSubscriptionRepository";

export class UserSubscriptionRepository implements IUserSubscriptionRepository {
  constructor(private db: Client) {}

  async findActiveByUserId(userId: number) {
    const result = await this.db.query(
      `
      SELECT *
      FROM user_subscriptions
      WHERE user_id = $1 AND status = 'active'
      ORDER BY end_date DESC
      LIMIT 1;
      `,
      [userId]
    );
    return result.rows[0] || null;
  }

  async create(data: {
    userId: number;
    subscriptionId: number;
    startDate: Date;
    endDate: Date;
    status: "active" | "expired" | "cancelled";
  }) {
    const result = await this.db.query(
      `
      INSERT INTO user_subscriptions
      (user_id, subscription_id, start_date, end_date, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `,
      [
        data.userId,
        data.subscriptionId,
        data.startDate,
        data.endDate,
        data.status,
      ]
    );
    return result.rows[0];
  }

  async updateStatus(id: number, status: string) {
    const result = await this.db.query(
      `
      UPDATE user_subscriptions
      SET status = $1
      WHERE id = $2
      RETURNING *;
      `,
      [status, id]
    );
    return result.rows[0];
  }
}