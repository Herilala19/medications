import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must not exceed 128 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
    ),
});

export const signUpSchema = z
  .object({
    firstname: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters long")
      .max(50, "First name must not exceed 50 characters"),
    lastname: z
      .string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters long")
      .max(50, "Last name must not exceed 50 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password must not exceed 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const createDrugSchema = z.object({
  name: z
    .string()
    .min(1, "Drug name is required")
    .min(2, "Drug name must be at least 2 characters")
    .max(100, "Drug name must not exceed 100 characters"),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
  dosage: z
    .string()
    .min(1, "Dosage is required")
    .max(50, "Dosage must not exceed 50 characters"),
  unit: z
    .string()
    .min(1, "Unit is required")
    .max(20, "Unit must not exceed 20 characters"),
  frequency: z
    .number()
    .min(1, "Frequency must be at least 1")
    .max(100, "Frequency must not exceed 100"),
  frequencyUnit: z.enum(["DAYS", "WEEKS", "MONTHS"], {
    error: "Frequency unit is required",
  }),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
  endDate: z
    .string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), "Invalid date format"),
});

export const updateDrugSchema = createDrugSchema.partial();

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type CreateDrugFormData = z.infer<typeof createDrugSchema>;
export type UpdateDrugFormData = z.infer<typeof updateDrugSchema>;
