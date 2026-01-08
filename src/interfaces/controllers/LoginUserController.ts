import { LoginUser } from "../../usecases/LoginUser";
import { loginUserSchema } from "../validators/loginUser.validator";

export class LoginUserController {
  constructor(
    private loginUser: LoginUser,
  ) {}
  async handle(input: unknown) {
    // Validate input
    const parsed = loginUserSchema.safeParse(input);
    if (!parsed.success) {
      return {
        status: 400,
        body: {
          error: "Invalid input",
          details: parsed.error.message,
        },
      };
    }

    try {
      // Execute use case
      const userLoginDTO = await this.loginUser.execute(parsed.data);
      console.log("User logged in successfully.");

      // Return success response
      return {
        status: 201,
        body: userLoginDTO,
      };
    } catch (err: any) {
      console.error("Error during user signin:", err);
      return {
        status: 400,
        body: { error: err.message },
      };
    }
  }
}