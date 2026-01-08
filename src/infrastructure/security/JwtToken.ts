import { IAuthToken } from "../../domain/services/IAuthToken";
import jwt from "jsonwebtoken";

export class JwtAuthToken implements IAuthToken {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  sign(payload: object): string {
    return jwt.sign(payload, this.secret);
  }

  verify(token: string): any {
    return jwt.verify(token, this.secret);
  }
}