import { Subscription } from "../entities/subscription.entity";

export interface ISubscriptionRepository {
  findAll(): Promise<Subscription[]>;
  findById(id: number): Promise<Subscription | null>;
  create(data: {
    name: string;
    price: number;
    durationDays: number;
  }): Promise<Subscription>;
}