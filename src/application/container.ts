import { PostgresClient } from "../infrastructure/database/clients/PostgresClient";
import { UserRepository } from "../infrastructure/repositories/user.repository";
import { BcryptPasswordHasher } from "../infrastructure/security/BcryptPasswordHasher";
import { JwtAuthToken } from "../infrastructure/security/JwtToken";

import { RegisterUser } from "../usecases/RegisterUser";
import { LoginUser } from "../usecases/LoginUser";
import { GetUserProfile } from "../usecases/GetUserProfile";
import { RegisterUserController } from "../interfaces/controllers/RegisterUserController";
import { LoginUserController } from "../interfaces/controllers/LoginUserController";
import { GetUserProfileController } from "../interfaces/controllers/GetUserProfileController";
import { Pool } from "pg";

// Infrastructure
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: process.env.PG_MAX_CONNECTIONS ? parseInt(process.env.PG_MAX_CONNECTIONS) : 10,
  ssl: process.env.PG_DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

const dbClient = new PostgresClient(pool);
const userRepository = new UserRepository(dbClient);
const passwordHasher = new BcryptPasswordHasher();
export const authTokenService = new JwtAuthToken(process.env.JWT_SECRET || "default_secret");

// Use cases
const registerUserUseCase = new RegisterUser(
  userRepository,
  passwordHasher
);

const loginUserUseCase = new LoginUser(
  userRepository,
  passwordHasher,
  authTokenService
);

const getUserProfileUseCase = new GetUserProfile(
  userRepository
);

// Controllers
export const registerUserController = new RegisterUserController(
  registerUserUseCase
);

export const loginUserController = new LoginUserController(
  loginUserUseCase,
);

export const getUserProfileController = new GetUserProfileController(
  getUserProfileUseCase,
);