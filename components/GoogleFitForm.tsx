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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

const ProductSchema = z.object({
  name: z.string(),
  step_count: z.coerce
    .number({
  errorMap: () => ({ message: "Heart rate must be a number" }),
})
    .min(0, "Please specify a step_count greater than or equal to 0"),
  heart_rate: z.coerce.number({
  errorMap: () => ({ message: "Heart rate must be a number" }),
}).min(0, "Please specify a valid heart rate"),
  weight: z.coerce.number({
  errorMap: () => ({ message: "Heart rate must be a number" }),
}).min(0, "Please specify a valid weight"),
  height: z.coerce.number({
  errorMap: () => ({ message: "Heart rate must be a number" }),
}).min(0, "Please specify a valid height"),
  calories_expended: z.coerce
    .number({
  errorMap: () => ({ message: "Heart rate must be a number" }),
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
  const submitForm= async (data: Product) => {
    try {
      console.log(data)
      await axios.post(
        `${baseUrl}/google-fit/submit-form`,
        {...data},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/disease-disclosure")
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
          weight: fitness_data.weight.toFixed(),
          height: fitness_data.height.toFixed(),
          calories_expended: fitness_data.calories_expended.toFixed(2),
          heart_rate: Math.floor(fitness_data.heart_rate),
          step_count: fitness_data.step_count,
          distance_traveled: fitness_data.distance_traveled.toFixed(2),
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
  }, [token]);

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
      <Card className="w-[55%] h-[70%] mt-3 min-h-min border-[0.5] border-purple-200 shadow-xl flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </Card>
    );
  }
  return (
    <Card
      className="w-[55%] h-[90%] h-min min-h-min border-[0.5] border-purple-200 shadow-xl flex flex-col justify-center
    bg-gray-50"
    >
      <CardHeader>
        <CardTitle>Add product</CardTitle>
        <CardDescription>
          Add product details(file links will be regenerated and discarded after
          temporary use)
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="h-full flex flex-col justify-around gap-[45px]"
      >
        <CardContent>
          <div className="flex w-full items-center gap-4">
            <div className="flex-[1.5] flex flex-col gap-3 shadow-lg pr-5 pb-5 pl-5 rounded-xl pt-5">
              {/* <div className="flex flex-col space-y-1.5 gap-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register("name")}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 -mt-3 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div> */}

              <div className="flex flex-col space-y-1.5 gap-1">
                <Label htmlFor="step-count">Step Count</Label>
                <Input
                  id="step-count"
                  type="number"
                  placeholder="Specify your average step count"
                  {...register("step_count")}
                  required
                />
                {errors.step_count && (
                  <p className="text-red-500 -mt-3 text-sm">
                    {errors.step_count.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5 gap-1">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="text"
                  placeholder="Specify your weight (in Kg)"
                  {...register("weight")}
                  required
                />
                {errors.weight && (
                  <p className="text-red-500 -mt-3 text-sm">
                    {errors.weight.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5 gap-1">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  type="text"
                  placeholder="Specify your height (in metres)"
                  {...register("height")}
                  required
                />
                {errors.height && (
                  <p className="text-red-500 -mt-3 text-sm">
                    {errors.height.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5 gap-1">
                <Label htmlFor="heart-rate">Heart Rate</Label>
                <Input
                  id="heart-rate"
                  type="number"
                  placeholder="Specify your heart rate (in BPM)"
                  {...register("heart_rate")}
                  required
                />
                {errors.heart_rate && (
                  <p className="text-red-500 -mt-3 text-sm">
                    {errors.heart_rate.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5 gap-1">
                <Label htmlFor="calories-expended">Calories Exerted</Label>
                <Input
                  id="calories-expended"
                  type="text"
                  placeholder="Specify the average calories expended (on a daily basis)"
                  {...register("calories_expended")}
                  required
                />
                {errors.calories_expended && (
                  <p className="text-red-500 -mt-3 text-sm">
                    {errors.calories_expended.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5 gap-1">
                <Label htmlFor="distance_traveled">Distance Traveled</Label>
                <Input
                  id="distance_traveled"
                  type="text"
                  placeholder="Specify the distance traveled on average(daily) in metres"
                  {...register("distance_traveled")}
                  required
                />
                {errors.distance_traveled && (
                  <p className="text-red-500 -mt-3 text-sm">
                    {errors.distance_traveled.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex-1 justify-center items-center p-2">
              <div
                className={`w-full bg-[url('/ProductIcon.webp')] bg-contain`}
                onClick={initiateTransfer}
              >
                <img src="/GoogleFit.png" className="w-full" />
              </div>
              <p className="text-center font-extralight">
                Import data from{" "}
                <span className="text-purple-500">Google Fit</span>
              </p>
              {/* <div className="flex gap-3">
                Import data from Google Fit
              </div> */}
            </div>
          </div>
        </CardContent>
        <CardFooter
          className="flex justify-between
        "
        >
          <Button variant="outline" type="reset">
            Clear
          </Button>
          <Button className="bg-black" type="submit" disabled={isSubmitting}>
            Deploy
          </Button>
        </CardFooter>
        {errors.root && (
          <p className="text-red-500 text-center text-sm">
            {errors.root.message}
          </p>
        )}
      </form>
    </Card>
  );
}
