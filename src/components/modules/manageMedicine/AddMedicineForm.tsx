"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { medicineSchema, type MedicineFormValues } from "@/types/validations/medicine";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Props {
  categories: { id: string; name: string }[];
}

export default function AddMedicineForm({ categories }: Props) {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      manufacturer: "",
      dosageForm: "",
      genericName: "",
      strength: "",
      image: "",
      stock: 0,
      categoryId: "",
    } as MedicineFormValues,
    // FIX 1: Pass the adapter here in useForm if version 0.42+
    // validatorAdapter: zodValidator(), 
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch("/api/medicines", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });
        if (!response.ok) throw new Error();
        toast.success("Medicine added successfully!");
        form.reset();
      } catch (e) {
        toast.error("Failed to add medicine");
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-xl bg-white shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">MediStore Inventory</h2>
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Name Field */}
        <form.Field
          name="name"
          // FIX 2: Version 0.42+ uses this clean syntax
          validators={{
            onChange: medicineSchema.shape.name,
          }}
        >
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name}>Medicine Name</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <em className="text-red-500 text-xs italic">
                  {field.state.meta.errors.join(", ")}
                </em>
              )}
            </div>
          )}
        </form.Field>

        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <form.Field
            name="price"
            validators={{
              onChange: medicineSchema.shape.price,
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <Label>Price (BDT)</Label>
                <Input
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </div>
            )}
          </form.Field>

          {/* Stock */}
          <form.Field
            name="stock"
            validators={{
              onChange: medicineSchema.shape.stock,
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <Label>Stock</Label>
                <Input
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </div>
            )}
          </form.Field>
        </div>

        {/* Category */}
        <form.Field
          name="categoryId"
          validators={{
            onChange: medicineSchema.shape.categoryId,
          }}
        >
          {(field) => (
            <div className="space-y-1">
              <Label>Category</Label>
              <select
                className="w-full border rounded-md p-2 bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              >
                <option value="">Select Category</option>
                {/* {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))} */}
              </select>
            </div>
          )}
        </form.Field>

        {/* Description */}
        <form.Field name="description">
          {(field) => (
            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                placeholder="Medicine details..."
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || isSubmitting} className="w-full h-11">
              {isSubmitting ? "Submitting..." : "List Medicine"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}