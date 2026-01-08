import { IUserRepository } from "../domain/interfaces/IUserRepository";
import { IPasswordHasher } from "../domain/services/IPasswordHasher";
import { UserMapper } from "./mappers/UserMapper";
import { UserDTO } from "./dtos/UserDTO";

interface RegisterUserInput {
  email: string;
  password: string;
  name?: string;
}

export class RegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher
  ) {}

  async execute(input: RegisterUserInput): Promise<UserDTO> {
    console.log("I am executing the RegisterUser use case with input:", input);
    // Check if user already exists
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new Error("User with this email already exists");
    }

    // Hash password
    const passwordHash = await this.passwordHasher.hash(input.password);

    // Create user
    const user = await this.userRepository.create({
      email: input.email,
      passwordHash: passwordHash,
      name: input.name,
    });

    //Return created user DTO
    return UserMapper.toDTO(user);
  }
}
