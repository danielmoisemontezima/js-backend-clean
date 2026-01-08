import { z } from "zod";

export const registerUserSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export type RegisterUserRequest = z.infer<typeof registerUserSchema>;