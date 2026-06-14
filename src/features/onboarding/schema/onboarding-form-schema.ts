import { z } from "zod";

export const formSchema = z
  .object({
    email: z.email("Please enter a valid email address").trim(),

    firstName: z
      .string()
      .trim()
      .min(1, "First name is required")
      .max(50, "First name is too long")
      .regex(
        /^[a-zA-Z\s.'-]+$/,
        "First name can only contain letters, spaces, periods, apostrophes, and hyphens",
      ),

    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .max(50, "Last name is too long")
      .regex(
        /^[a-zA-Z\s.'-]+$/,
        "Last name can only contain letters, spaces, periods, apostrophes, and hyphens",
      ),

    dob: z
      .date({
        error: "Date of Birth is required"
      })
      .refine((date) => {
        const currentYear = new Date().getFullYear();
        const num = date.getFullYear();
        return num >= currentYear - 120 && num <= currentYear;
      }, "Please enter a valid year"),

    gender: z.enum(["male", "female", "other"], {
      error: "Gender is required",
    }),

    address: z
      .string()
      .trim()
      .min(5, "Street address is required")
      .max(200, "Address is too long"),

    city: z
      .string()
      .trim()
      .min(2, "City is required")
      .max(100, "City name is too long"),

    state: z
      .string()
      .trim()
      .min(2, "State is required")
      .max(100, "State name is too long"),

    zipCode: z
      .string()
      .trim()
      .regex(/^\d{5}$/, "Please enter a valid 5-digit ZIP code"),

    phoneNumber: z
      .string()
      .trim()
      .regex(
        /^(\+1\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/,
        "Please enter a valid US phone number",
      ),
  });

export type FormValues = z.infer<typeof formSchema>;
