import bcrypt from "bcrypt";
import { IPasswordHasher } from "../../domain/services/IPasswordHasher";

// Implementation of IPasswordHasher using bcrypt
// This will be used in your controller or handlers to hash and compare passwords
export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}