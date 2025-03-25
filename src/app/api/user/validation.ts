import { z } from "zod";

export const userAddValidation = z
    .object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        email: z.string().email("Invalid email format"),
        phone: z.string().regex(/^\d{0,15}$/, "Phone should not be greater than 15-digit"),
        amount: z.string().regex(/^\d{0,}$/, "Phone should not be greater than 15-digit").optional(),
        date: z.string().optional(),
    })

