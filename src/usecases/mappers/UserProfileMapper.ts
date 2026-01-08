import { User } from "../../domain/entities/user.entity";
import { UserProfileDTO } from "../dtos/UserProfileDTO";

export class UserProfileMapper {
  static toDTO(user: User): UserProfileDTO {
    return {
      id: user.externalId,
      email: user.email,
      name: user.name,
    };
  }
}