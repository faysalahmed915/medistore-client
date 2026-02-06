import * as z from "zod";

export const medicineSchema = z.object({
    name: z.string().min(2, "Medicine name must be at least 2 characters"),
    description: z.string().default(""), // Better for forms than .optional()
    price: z.coerce.number().min(1, "Price must be at least 1"),
    manufacturer: z.string().min(2, "Manufacturer name is required"),
    dosageForm: z.string().default(""),
    genericName: z.string().default(""),
    strength: z.string().default(""),
    image: z.string().url("Please provide a valid image URL").or(z.literal("")).default(""),
    stock: z.coerce.number().min(0, "Stock cannot be less than 0"),
    categoryId: z.string().min(1, "Please select a category"),
});

export type MedicineFormValues = z.infer<typeof medicineSchema>;