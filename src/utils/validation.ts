import { MESSAGE } from "@/constants/message";
import { z } from "zod";

export const userAddValidation = z
    .object({
        name: z.string().min(3, MESSAGE.NAME_MIN_LENGTH),
        email: z.string().email(MESSAGE.EMAIL_FORMAT),
        phone: z.string().regex(/^\d{0,15}$/, MESSAGE.PHONE_MAX_LENGTH),
        amount: z.string().regex(/^\d{0,}$/, MESSAGE.AMOUNT_SHOULD_BE_NUMBER).optional(),
        date: z.string().optional(),
    })

export const userUpdateValidation = z
    .object({
        name: z.string().min(3, MESSAGE.NAME_MIN_LENGTH).optional(),
        email: z.string().email(MESSAGE.EMAIL_FORMAT).optional(),
        phone: z.string().regex(/^\d{0,15}$/, MESSAGE.PHONE_MAX_LENGTH).optional(),
    })

export const transactionValidation = z
    .object({
        userId: z.string(),
        amount: z.string().regex(/^\d{0,}$/, MESSAGE.AMOUNT_SHOULD_BE_NUMBER).optional(),
        date: z.string().optional(),
        type: z.enum(["credit", 'debit']).optional(),
    })

