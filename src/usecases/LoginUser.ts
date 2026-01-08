import { IUserRepository } from "../domain/interfaces/IUserRepository";
import { IPasswordHasher } from "../domain/services/IPasswordHasher";
import { IAuthToken } from "../domain/services/IAuthToken";
import { UserLoginMapper } from "./mappers/UserLoginMapper";
import { UserLoginDTO } from "./dtos/UserLoginDTO";

interface LoginUserInput {
  email: string;
  password: string;
}

export class LoginUser {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private authToken: IAuthToken
  ) {}

  async execute(input: LoginUserInput): Promise<UserLoginDTO> {
    // Check if user already exists
    const existing = await this.userRepository.findByEmail(input.email);
    if (!existing) {
      throw new Error("User with this email does not exist");
    }

    const valid = await this.passwordHasher.compare(
        input.password,
        existing.passwordHash
    );

    if (!valid) {
      throw new Error("Invalid email or password");
    }

    // Generate auth token
    const token = this.authToken.sign({ id: existing.id, email: existing.email });

    // Return user DTO
    return UserLoginMapper.toDTO(existing, token);
  }
}