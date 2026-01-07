export class User {
  constructor(
    public readonly id: number,
    public readonly externalId: string,
    public email: string,
    public passwordHash: string,
    public name: string | null,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}
}