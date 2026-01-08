import { User } from "../../domain/entities/user.entity";
import { UserDTO } from "../dtos/UserDTO";

export class UserMapper {
  static toDTO(user: User): UserDTO {
    return {
      id: user.externalId,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }
}