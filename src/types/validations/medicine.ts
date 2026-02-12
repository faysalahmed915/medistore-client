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

export type Medicine = z.infer< typeof medicineSchema> & {
    id: string;
    isAvailable: boolean;};



export const getAllMedicinesQuerySchema = z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    manufacturer: z.string().optional(),
    // z.coerce.number() স্ট্রিং "50" কে অটো 50 বানিয়ে দিবে
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
    // Boolean conversion logic
    isAvailable: z.preprocess(
        (val) => val === 'true' ? true : val === 'false' ? false : undefined,
        z.boolean().optional()
    ),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).default(10),
    sortBy: z.string().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
});


export type GetAllMedicinesOptions = z.infer<typeof getAllMedicinesQuerySchema>;
