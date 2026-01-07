export class SubscriptionOrder {
  constructor(
    public readonly id: number,
    public readonly externalId: string,
    public readonly userId: number,
    public readonly subscriptionId: number,
    public status: "pending" | "processing" | "completed" | "failed",
    public paymentReference: string | null,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}
}