import { IDatabaseClient } from "../database/interfaces/IDatabaseClient";
import { UserSubscription } from "../../domain/entities/user-subscription.entity";
import { IUserSubscriptionRepository } from "../../domain/interfaces/IUserSubscriptionRepository";

export class UserSubscriptionRepository implements IUserSubscriptionRepository {
  constructor(private db: IDatabaseClient) {}

  private mapRowToEntity(row: any) : UserSubscription {
    return new UserSubscription (
      row.id,
      row.user_id,
      row.subscription_id,
      row.start_date,
      row.end_date,
      row.status,
      row.created_at,
    );
  }

  async findActiveByUserId(userId: number): Promise<UserSubscription | null> {
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
    return this.mapRowToEntity(result.rows[0]) || null;
  }

  async create(data: {
    userId: number;
    subscriptionId: number;
    startDate: Date;
    endDate: Date;
    status: "active" | "expired" | "cancelled";
  }): Promise<UserSubscription> {
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
    return this.mapRowToEntity(result.rows[0]);
  }

  async updateStatus(id: number, status: string): Promise<UserSubscription> {
    const result = await this.db.query(
      `
      UPDATE user_subscriptions
      SET status = $1
      WHERE id = $2
      RETURNING *;
      `,
      [status, id]
    );
    return this.mapRowToEntity(result.rows[0]);
  }
}