import { z } from "zod";

export const formSchema = z.object({
  email: z.email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  month: z.string().min(1, "Month is required"),
  day: z.string().min(1, "Day is required"),
  year: z.string().min(1, "Year is required"),
  gender: z.string().min(1, "Gender is required"),
  address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit zip code"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
});

export type FormValues = z.infer<typeof formSchema>;
