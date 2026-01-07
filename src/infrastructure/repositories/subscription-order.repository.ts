import { IDatabaseClient } from "../database/interfaces/IDatabaseClient";
import { SubscriptionOrder } from "../../domain/entities/subscription-order.entity";
import { ISubscriptionOrderRepository } from "../../domain/interfaces/ISubscriptionOrderRepository";

export class SubscriptionOrderRepository implements ISubscriptionOrderRepository {
  constructor(private db: IDatabaseClient) {}

  private mapRowToEntity(row: any): SubscriptionOrder {
    return new SubscriptionOrder(
      row.id,
      row.external_id,
      row.user_id,
      row.subscription_id,
      row.status,
      row.payment_reference,
      row.created_at,
      row.updated_at
    );
  }

  async findById(id: number): Promise<SubscriptionOrder | null> {
    const result = await this.db.query(
      `SELECT * FROM subscription_orders WHERE id = $1`,
      [id]
    );
    return this.mapRowToEntity(result.rows[0]) || null;
  }

  async findPending(): Promise<SubscriptionOrder[]> {
    const result = await this.db.query(
      `SELECT * FROM subscription_orders WHERE status = 'pending'`
    );
    return result.rows.map(row => this.mapRowToEntity(row));
  }

  async create(data: {
    userId: number;
    subscriptionId: number;
    status: "pending" | "processing" | "completed" | "failed";
    paymentReference?: string;
  }): Promise<SubscriptionOrder> {
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
    return this.mapRowToEntity(result.rows[0]);
  }

  async updateStatus(id: number, status: string): Promise<SubscriptionOrder> {
    const result = await this.db.query(
      `
      UPDATE subscription_orders
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *;
      `,
      [status, id]
    );
    return this.mapRowToEntity(result.rows[0]);
  }
}