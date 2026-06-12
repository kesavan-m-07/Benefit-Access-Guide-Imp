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
        /^[a-zA-Z\s'-]+$/,
        "First name can only contain letters, spaces, apostrophes, and hyphens",
      ),

    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .max(50, "Last name is too long")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Last name can only contain letters, spaces, apostrophes, and hyphens",
      ),

    month: z.string().min(1, "Month is required"),

    day: z.string().min(1, "Day is required"),

    year: z
      .string()
      .min(1, "Year is required")
      .refine((year) => {
        const currentYear = new Date().getFullYear();
        const num = Number(year);

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
      .regex(/^\d{6}$/, "Please enter a valid 6-digit zip code"),

    phoneNumber: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, "Please enter a valid phone number"),
  })
  .superRefine(({ day, month, year }, ctx) => {
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    const isValidDate =
      date.getFullYear() === Number(year) &&
      date.getMonth() === Number(month) - 1 &&
      date.getDate() === Number(day);

    if (!isValidDate) {
      ctx.addIssue({
        code: "custom",
        path: ["day"],
        message: "Please select a valid date",
      });
    }
  });

export type FormValues = z.infer<typeof formSchema>;
