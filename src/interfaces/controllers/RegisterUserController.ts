import { RegisterUser } from "../../usecases/RegisterUser";
import { registerUserSchema } from "../validators/registerUser.validator";

export class RegisterUserController {
  constructor(private registerUser: RegisterUser) {}

  async handle(input: unknown) {
    // Validate input
    const parsed = registerUserSchema.safeParse(input);
    if (!parsed.success) {
      return {
        status: 400,
        body: {
          error: "Invalid input",
          details: parsed.error.message,
        },
      };
    }

    console.log("Input validated successfully:", parsed.data);

    try {
      // Execute use case
      const userDTO = await this.registerUser.execute(parsed.data);

      console.log("User registered successfully.");

      // Return success response
      return {
        status: 201,
        body: userDTO,
      };
    } catch (err: any) {
      console.error("Error during user registration:", err);
      return {
        status: 400,
        body: { error: err.message },
      };
    }
  }
}