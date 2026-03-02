"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Truck, 
  Clock, 
  HeartPulse, 
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  ShoppingBag
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Genuine Medicines",
    description: "We source directly from certified manufacturers to ensure 100% authenticity and safety."
  },
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: "Express Delivery",
    description: "Get your essential OTC medicines delivered to your doorstep within record time."
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "24/7 Support",
    description: "Our dedicated support team and pharmacists are always ready to assist you."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* 1. Hero Section - Using Muted background for subtle contrast */}
      <section className="relative py-20 overflow-hidden border-b bg-muted/30">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="secondary" className="mb-4 py-1 px-4 text-primary border-primary/20">
            Welcome to MediStore
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            Making Healthcare <br /> 
            <span className="text-primary italic">Accessible & Affordable</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            MediStore is your trusted digital pharmacy for over-the-counter (OTC) 
            medicines. We bridge the gap between wellness and your doorstep.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/medicines">
              <Button size="lg" className="rounded-full px-8 gap-2 shadow-md hover:shadow-lg transition-all">
                <ShoppingBag size={18} /> Shop Medicines
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full px-8 bg-background">
              Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Mission Section - Dynamic Text & Border colors */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-secondary relative group border border-border">
              <img 
                src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000&auto=format&fit=crop" 
                alt="Healthcare Professional" 
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply"></div>
              {/* Floating Info Card - Theme Responsive */}
              <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-xl hidden md:block border border-border">
                <div className="flex items-center gap-4">
                  <div className="bg-green-500/10 p-3 rounded-full">
                    <CheckCircle2 className="text-green-600 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Verified Pharmacy</p>
                    <p className="text-xs text-muted-foreground">DGDA Approved Sources</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="inline-block p-3 bg-primary/10 rounded-2xl text-primary">
              <Stethoscope size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Our Commitment to Your <br />Family&apos;s Wellbeing
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              MediStore started with a simple idea: Basic health essentials should be a click away. 
              We&apos;ve built a robust supply chain to ensure quality and reliability.
            </p>
            <ul className="space-y-4">
              {["100% Authentic Products", "Secure Temperature Storage", "Discrete Packaging"].map((text) => (
                <li key={text} className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="text-primary h-5 w-5" /> {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Features Grid - Using Secondary color for Dark Mode support */}
      <section className="py-24 bg-secondary/50 border-y border-border relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">The MediStore Advantage</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Innovative healthcare solutions for modern lives.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
                <CardContent className="pt-10 pb-10 text-center space-y-5">
                  <div className="mx-auto w-fit bg-primary/10 p-5 rounded-2xl border border-primary/5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed px-4">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Stats Section - Clean & Balanced */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Medicines", value: "2,500+" },
            { label: "Customers", value: "15k+" },
            { label: "Sellers", value: "85+" },
            { label: "Success Rate", value: "99.9%" }
          ].map((stat, i) => (
            <div key={i} className="space-y-2 group">
              <h3 className="text-4xl font-black text-primary transition-transform group-hover:scale-110">{stat.value}</h3>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Section - Branding with Primary Color */}
      <section className="py-12 px-4">
        <div className="container mx-auto bg-primary rounded-[2.5rem] p-12 md:p-20 text-center text-primary-foreground relative overflow-hidden shadow-xl">
          {/* Subtle texture for visual depth */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Your Health, <br />Our Priority.</h2>
            <p className="text-lg opacity-90 font-medium">
              Join thousands of satisfied customers who trust MediStore for their 
              daily medical needs.
            </p>
            <Link href="/medicines" className="inline-block">
              <Button size="lg" variant="secondary" className="rounded-full px-10 h-14 text-lg font-bold gap-2 group shadow-2xl hover:bg-secondary/90 transition-all">
                Start Shopping <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}