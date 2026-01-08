import { IUserRepository } from "../domain/interfaces/IUserRepository";
import { UserProfileMapper } from "./mappers/UserProfileMapper";
import { UserProfileDTO } from "./dtos/UserProfileDTO";

interface GetUserProfileInput {
  id: number;
}

export class GetUserProfile {
  constructor(
    private userRepository: IUserRepository
  ) {}

  async execute(input: GetUserProfileInput): Promise<UserProfileDTO> {
    // Check if user already exists
    const existing = await this.userRepository.findById(input.id);
    if (!existing) {
      throw new Error("User does not exist");
    }

    // Return user DTO
    return UserProfileMapper.toDTO(existing);
  }
}