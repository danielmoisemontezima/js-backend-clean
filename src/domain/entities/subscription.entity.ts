export class Subscription {
  constructor(
    public readonly id: number,
    public readonly externalId: string,
    public name: string,
    public price: number,
    public durationDays: number,
    public readonly createdAt: Date
  ) {}
}