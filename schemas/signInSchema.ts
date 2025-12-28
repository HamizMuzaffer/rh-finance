import { z } from "zod";

// Validation for sign in schema 

export const signInSchema = z.object({
    email: z.string(),
    password: z.string()
})