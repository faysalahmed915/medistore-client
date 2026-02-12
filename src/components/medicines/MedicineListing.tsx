"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Loader2, Filter, ChevronLeft, ChevronRight } from "lucide-react";

// Shadcn Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Medicine } from "@/types/validations/medicine";
import { MedicineService } from "@/services/medicine";

export default function MedicineListing() {
    // --- States ---
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<string>("all");
    const [manufacturer, setManufacturer] = useState<string | undefined>(undefined);
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const limit = 10;

    // --- Fetching Manufacturers (Dynamic Checkbox Options) ---
    // Note: Assuming you have an endpoint for this, or you can hardcode some
    const { data: manufacturersList } = useQuery({
        queryKey: ["manufacturers"],
        queryFn: async () => ["Square Pharma", "Beximco", "Incepta", "Renata", "ACI"],
    });

    // --- Main Medicines Query ---
    const { data, isLoading, isError } = useQuery({
        queryKey: ["medicines", page, search, category, manufacturer, minPrice, maxPrice, sortBy, sortOrder],
        queryFn: () => MedicineService.getAll({
            page,
            limit,
            search: search || undefined,
            category: category === "all" ? undefined : category,
            manufacturer,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
            sortBy,
            sortOrder
        }),
    });

    const medicines = data?.data || [];
    const meta = data?.meta || { totalPages: 1 };

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto">

            {/* --- Sidebar Filters --- */}
            <aside className="w-full md:w-64 space-y-6 border p-4 rounded-xl bg-white h-fit sticky top-6">
                <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2"><Filter size={18} /> Filters</h3>

                    {/* Price Range */}
                    <div className="space-y-2 mb-6">
                        <Label>Price Range (৳)</Label>
                        <div className="flex gap-2">
                            <Input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                            <Input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                        </div>
                    </div>

                    {/* Category Select */}
                    <div className="space-y-2 mb-6">
                        <Label>Category</Label>
                        <Select onValueChange={(val) => setCategory(val)} defaultValue="all">
                            <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="Tablet">Tablet</SelectItem>
                                <SelectItem value="Syrup">Syrup</SelectItem>
                                <SelectItem value="Capsule">Capsule</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Manufacturer Checkbox List */}
                    <div className="space-y-3">
                        <Label>Manufacturer</Label>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {manufacturersList?.map((mfg) => (
                                <div key={mfg} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={mfg}
                                        checked={manufacturer === mfg}
                                        onCheckedChange={() => setManufacturer(manufacturer === mfg ? undefined : mfg)}
                                    />
                                    <label htmlFor={mfg} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">{mfg}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1 space-y-6">

                {/* Search & Sort Bar */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-3 border rounded-xl">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
                        <Input
                            placeholder="Search by name, manufacturer or generic..."
                            className="pl-10"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Label className="whitespace-nowrap">Sort By:</Label>
                        <Select
                            // val কে টাইপ কাস্ট করে দিন যাতে সে আপনার স্টেটের সাথে ম্যাচ করে
                            onValueChange={(val) => setSortOrder(val as "asc" | "desc")}
                            defaultValue={sortOrder}
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Price Order" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Price: Low to High</SelectItem>
                                <SelectItem value="desc">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Medicine Grid */}
                {isLoading ? (
                    <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {medicines.map((med: Partial<Medicine>) => (
                            <Card key={med.id} className="group hover:border-primary transition-all">
                                <CardHeader className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant={med.isAvailable ? "secondary" : "destructive"}>
                                            {med.isAvailable ? "In Stock" : "Stock Out"}
                                        </Badge>
                                        <span className="font-bold text-primary text-lg">৳{med.price}</span>
                                    </div>
                                    <CardTitle className="text-md line-clamp-1">{med.name}</CardTitle>
                                    <p className="text-xs text-muted-foreground">{med.strength} - {med.dosageForm}</p>
                                </CardHeader>
                                <CardContent className="px-4 pb-2">
                                    <div className="text-sm space-y-1">
                                        <p className="line-clamp-1 text-gray-600"><strong>Generic:</strong> {med.genericName}</p>
                                        <p className="text-xs text-gray-500 italic">MFG: {med.manufacturer}</p>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4">
                                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white" variant="default">View Details</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && medicines.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">No medicines found matching your criteria.</div>
                )}

                {/* --- Pagination --- */}
                <div className="flex items-center justify-between border-t pt-4">
                    <p className="text-sm text-muted-foreground">Page {page} of {meta.totalPages}</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                            <ChevronLeft size={16} /> Previous
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={page >= meta.totalPages}>
                            Next <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}