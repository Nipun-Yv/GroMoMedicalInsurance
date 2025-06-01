"use client";
import * as React from "react";
import { useState, useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

const ProductSchema = z.object({
  name: z.string(),
  step_count: z.coerce
    .number({
      errorMap: () => ({ message: "Step count must be a number" }),
    })
    .min(0, "Please specify a step_count greater than or equal to 0"),
  heart_rate: z.coerce.number({
    errorMap: () => ({ message: "Heart rate must be a number" }),
  }).min(0, "Please specify a valid heart rate"),
  weight: z.coerce.number({
    errorMap: () => ({ message: "Weight must be a number" }),
  }).min(0, "Please specify a valid weight"),
  height: z.coerce.number({
    errorMap: () => ({ message: "Height must be a number" }),
  }).min(0, "Please specify a valid height"),
  calories_expended: z.coerce
    .number({
      errorMap: () => ({ message: "Calories must be a number" }),
    })
    .min(0, "Please specify a valid caloric expenditure"),
  distance_traveled: z.coerce.number().min(0, "Invalid distance data"),
});

type Product = z.infer<typeof ProductSchema>;

export function GoogleFitForm() {
  const { isLoaded, isSignedIn, getToken, userId } = useAuth();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  const initiateTransfer = async () => {
    const SCOPES = [
      "https://www.googleapis.com/auth/fitness.activity.read",
      "https://www.googleapis.com/auth/fitness.heart_rate.read",
      "https://www.googleapis.com/auth/fitness.body.read",
      "https://www.googleapis.com/auth/fitness.sleep.read",
      "https://www.googleapis.com/auth/fitness.location.read",
    ].join(" ");

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID ?? " ",
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI ?? " ",
      response_type: "code",
      scope: SCOPES,
      access_type: "offline",
      prompt: "consent",
      state: userId || "",
    });
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    window.location.href = authUrl;
  };

  const [loading, setLoading] = useState<boolean>(true);
  const {
    register,
    formState: { errors, isSubmitting },
    setError,
    handleSubmit,
    reset,
  } = useForm<Product>();

  const submitForm = async (data: Product) => {
    try {
      console.log(data);
      await axios.post(
        `${baseUrl}/google-fit/submit-form`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/health-details");
    } catch (err) {
      console.log(err);
      setError("root", {
        message:
          "An error occurred while submitting the form, please try again later",
      });
    }
  };

  useEffect(() => {
    async function fetchFitnessData() {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      try {
        const result = await axios.get(`${baseUrl}/google-fit/fitness-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const {
          data: { fitness_data },
        } = await axios.get(`${baseUrl}/google-fit/fitness-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        reset({
          name: "health-assessment",
          weight: fitness_data.weight.toFixed(),
          height: fitness_data.height.toFixed(),
          calories_expended: parseInt(fitness_data.calories_expended.toFixed(2)),
          heart_rate: Math.floor(fitness_data.heart_rate),
          step_count: fitness_data.step_count,
          distance_traveled: parseInt(fitness_data.distance_traveled.toFixed(2)),
        });
      } catch (err: any) {
        console.error("Unable to pre-fetch fitness data", err.message);
      } finally {
        setLoading(false);
      }
    }
    if (token) {
      fetchFitnessData();
    }
  }, [token, reset]);

  useEffect(() => {
    async function checkAuthAndGetToken() {
      if (!isLoaded) return;

      if (!isSignedIn) {
        router.replace("/home");
        return;
      }

      const t = await getToken();
      setToken(t);
    }

    checkAuthAndGetToken();
  }, [isLoaded, isSignedIn, router, getToken]);

  if (loading || !isLoaded || !isSignedIn || !token) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <Card className="w-full max-w-md mx-auto shadow-xl border-0 p-8">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="animate-spin text-blue-600" size="48" />
            <p className="text-gray-600">Loading Google Fit data...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white px-4">
      <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 overflow-hidden">
        {/* Gradient Header */}
        <div 
          className="px-8 py-12 text-white rounded-t-xl"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 40%,rgb(71, 140, 225) 65%,#3b82f6 80%, #1e3a8a 100%)'
          }}
        >
          <h1 className="text-4xl font-bold mb-2">Advanced Health Analytics</h1>
          <p className="text-blue-100 text-lg">Comprehensive AI-powered health risk assessment platform</p>
          
          {/* Google Fit Integration Button */}
          <Button 
            onClick={initiateTransfer}
            variant={"outline"}
            className="mt-6 bg-transparent border-[0.5] hover:cursor-pointer"
          >
            <p className="text-extralight">Sync with Google Fit</p>
    
          </Button>
        </div>

        <form onSubmit={handleSubmit(submitForm)} className="bg-white">
          <CardContent className="p-8 space-y-8">
            {/* Google Fit Data Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-semibold text-gray-800">Fitness Data</h2>
                <p className="text-gray-600 text-sm">Data synced from Google Fit</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="step_count" className="text-sm font-medium text-gray-700">Step Count</Label>
                  <Input
                    id="step_count"
                    type="number"
                    placeholder="Daily steps"
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register("step_count")}
                    required
                  />
                  {errors.step_count && (
                    <p className="text-red-500 text-sm">{errors.step_count.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heart_rate" className="text-sm font-medium text-gray-700">Heart Rate (bpm)</Label>
                  <Input
                    id="heart_rate"
                    type="number"
                    placeholder="Average heart rate"
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register("heart_rate")}
                    required
                  />
                  {errors.heart_rate && (
                    <p className="text-red-500 text-sm">{errors.heart_rate.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calories_expended" className="text-sm font-medium text-gray-700">Calories Burned</Label>
                  <Input
                    id="calories_expended"
                    type="number"
                    placeholder="Daily calories"
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register("calories_expended")}
                    required
                  />
                  {errors.calories_expended && (
                    <p className="text-red-500 text-sm">{errors.calories_expended.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-sm font-medium text-gray-700">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Your weight"
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register("weight")}
                    required
                  />
                  {errors.weight && (
                    <p className="text-red-500 text-sm">{errors.weight.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-sm font-medium text-gray-700">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Your height"
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register("height")}
                    required
                  />
                  {errors.height && (
                    <p className="text-red-500 text-sm">{errors.height.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distance_traveled" className="text-sm font-medium text-gray-700">Distance (km)</Label>
                  <Input
                    id="distance_traveled"
                    type="number"
                    placeholder="Distance traveled"
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register("distance_traveled")}
                    required
                  />
                  {errors.distance_traveled && (
                    <p className="text-red-500 text-sm">{errors.distance_traveled.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Health History Section */}
            <div className="space-y-6" hidden={true}>
              <div className="border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-semibold text-gray-800">Health History</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6" hidden={true}>
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Checkbox id="hypertension" className="data-[state=checked]:bg-blue-600" />
                  <Label htmlFor="hypertension" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Hypertension
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Checkbox id="heart-disease" className="data-[state=checked]:bg-blue-600" />
                  <Label htmlFor="heart-disease" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Heart Disease
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Checkbox id="diabetes" className="data-[state=checked]:bg-blue-600" />
                  <Label htmlFor="diabetes" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Diabetes
                  </Label>
                </div>
              </div>
            </div>

            {/* Hidden name field to maintain form functionality */}
            <Input {...register("name")} defaultValue="health-assessment" className="hidden" />
          </CardContent>

          <CardFooter className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-between">
            <Button 
              variant="outline" 
              type="reset"
              className="px-8 py-2 border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Clear
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
            >
              {isSubmitting ? "Processing..." : "Submit Assessment"}
            </Button>
          </CardFooter>

          {errors.root && (
            <div className="px-8 py-4 bg-red-50 border-t border-red-200">
              <p className="text-red-600 text-center text-sm">{errors.root.message}</p>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}
