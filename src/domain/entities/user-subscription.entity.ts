export class UserSubscription {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly subscriptionId: number,
    public startDate: Date,
    public endDate: Date,
    public status: "active" | "expired" | "cancelled",
    public readonly createdAt: Date
  ) {}
}