import { SubscriptionOrder } from "../entities/subscription-order.entity";

export interface ISubscriptionOrderRepository {
  findById(id: number): Promise<SubscriptionOrder | null>;
  findPending(): Promise<SubscriptionOrder[]>;
  create(data: {
    userId: number;
    subscriptionId: number;
    status: "pending" | "processing" | "completed" | "failed";
    paymentReference?: string;
  }): Promise<SubscriptionOrder>;
  updateStatus(id: number, status: "pending" | "processing" | "completed" | "failed"): Promise<SubscriptionOrder>;
}