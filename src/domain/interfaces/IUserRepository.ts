import { User } from "../entities/user.entity";

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByExternalId(externalId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: {
    email: string;
    passwordHash: string;
    name?: string;
  }): Promise<User>;
}