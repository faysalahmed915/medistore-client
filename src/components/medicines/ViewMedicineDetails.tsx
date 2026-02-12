"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MedicineService } from "@/services/medicine";
import { useParams } from "next/navigation";
import { 
  Loader2, 
  ShoppingCart, 
  ChevronLeft, 
  Stethoscope, 
  Factory, 
  Layers, 
  Info 
} from "lucide-react";

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";



interface MedicineDetailsProps {
  id: string;
}


export default function ViewMedicineDetails({ id }: MedicineDetailsProps) {
//   const { id } = useParams();
//   const { id } = useParams() as { id: string };

  const { data: medicine, isLoading, isError } = useQuery({
    queryKey: ["medicine", id],
    queryFn: () => MedicineService.getById(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-muted-foreground animate-pulse">Loading medicine details...</p>
      </div>
    );
  }

  if (isError || !medicine) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Medicine not found!</h2>
        <Link href="/medicines">
          <Button variant="link">Back to Listing</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    // এখানে আপনার Zustand বা Cart লজিক বসবে
    console.log("Added to cart:", medicine.name);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Back Button */}
      <Link href="/medicines">
        <Button variant="ghost" className="mb-6 group">
          <ChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
          Back to Medicines
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Image Section */}
        <div className="space-y-4">
          <div className="aspect-square bg-slate-50 border rounded-2xl flex items-center justify-center overflow-hidden">
            {medicine.image ? (
              <img 
                src={medicine.image} 
                alt={medicine.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-muted-foreground flex flex-col items-center gap-2">
                <Info size={48} strokeWidth={1} />
                <span>No Image Available</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant={medicine.isAvailable ? "secondary" : "destructive"}>
                {medicine.isAvailable ? "In Stock" : "Currently Unavailable"}
              </Badge>
              <span className="text-sm text-muted-foreground">ID: {medicine.id.slice(-6)}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{medicine.name}</h1>
            <p className="text-lg text-primary font-medium">{medicine.strength} - {medicine.dosageForm}</p>
          </div>

          <div className="text-4xl font-bold text-slate-900">৳{medicine.price}</div>

          <Separator />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-slate-50/50">
              <Stethoscope className="text-blue-500" size={20} />
              <div>
                <p className="text-[10px] uppercase text-muted-foreground font-bold">Generic</p>
                <p className="text-sm font-semibold">{medicine.genericName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-slate-50/50">
              <Factory className="text-orange-500" size={20} />
              <div>
                <p className="text-[10px] uppercase text-muted-foreground font-bold">Manufacturer</p>
                <p className="text-sm font-semibold">{medicine.manufacturer}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <Card className="bg-slate-50/30 border-none shadow-none">
            <CardContent className="p-4 space-y-2">
              <h4 className="font-semibold flex items-center gap-2 italic text-slate-700">
                <Layers size={16} /> Description
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {medicine.description || "No description provided for this medicine."}
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              size="lg" 
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white h-14 text-lg"
              onClick={handleAddToCart}
              disabled={!medicine.isAvailable}
            >
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </Button>
          </div>
          
          <p className="text-[11px] text-center text-muted-foreground">
            * Please consult a doctor before taking any medication.
          </p>
        </div>
      </div>
    </div>
  );
}