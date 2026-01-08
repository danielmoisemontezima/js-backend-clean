import { User } from "../../domain/entities/user.entity";
import { UserLoginDTO } from "../dtos/UserLoginDTO";

export class UserLoginMapper {
  static toDTO(user: User, token: string): UserLoginDTO {
    return {
      id: user.externalId,
      token: token,
    };
  }
}