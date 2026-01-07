import { UserSubscription } from "../entities/user-subscription.entity";

export interface IUserSubscriptionRepository {
  findActiveByUserId(userId: number): Promise<UserSubscription | null>;
  create(data: {
    userId: number;
    subscriptionId: number;
    startDate: Date;
    endDate: Date;
    status: "active" | "expired" | "cancelled";
  }): Promise<UserSubscription>;
  updateStatus(id: number, status: "active" | "expired" | "cancelled"): Promise<UserSubscription>;
}