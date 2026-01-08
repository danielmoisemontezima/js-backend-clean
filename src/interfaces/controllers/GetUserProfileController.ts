import { GetUserProfile } from "../../usecases/GetUserProfile";

export class GetUserProfileController {
  constructor(
    private getUserProfile: GetUserProfile,
  ) {}
  async handle(input: { id: number }) {
    try {
      // Execute use case
      const userProfileDTO = await this.getUserProfile.execute(input);
      console.log("User profile retrieved successfully.");
      
      // Return success response
      return {
        status: 201,
        body: userProfileDTO,
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