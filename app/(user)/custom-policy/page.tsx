"use client";
import CategoryBar from "@/components/CategoryBar";
import ListedProducts from "@/components/ListedPolicies";
import SearchForm from "@/components/SearchForm";
import Assistant from "@/components/Assistant";

import { SearchParams } from "next/dist/server/request/search-params";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

import axios from "axios";
import { Policy } from "@/types/policy";
import { SelectedPolicyProvider } from "@/contexts/SelectedPolicyContext";

const categoryPre = z.enum([
  "dataset",
  "component",
  "template",
  "custom",
  "any",
]);

const ProductsPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { isLoaded, isSignedIn, getToken,userId } = useAuth();
  const router = useRouter();
  const [policyList, setPolicyList] = useState<Policy[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [age,setAge]=useState<number|null>(null)
  const [gender,setGender]=useState<string>("male")
  const [diabetes_score,setDiabetes]=useState<number|null>()
  const [cardiovascular_score,setCardiovascular]=useState<number|null>()
  useEffect(() => {
    const fetchCustomPolicies = async () => {
      const { data } = await axios.get(`${baseUrl}/policy/custom-policies`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setPolicyList(data.policiesWithAddOns);
      setAge(data.age)
      setGender(data.gender)
      setCardiovascular(data.cardiovascular_score)
      setDiabetes(data.diabetes_score)
    };
    if (token) {
      fetchCustomPolicies();
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
      // const result=await axios.post("http://56.228.16.93:8000/api/v1/predict",{
      //   age:45,
      //   gender:"male",
      //   bmi:28.5,
      //   smoking:"no",
      //   genetic_risk:"medium",
      //   physical_activity:5.0,
      //   alcohol_intake:8.0,
      //   cancer_history:"no"
      // })
      // console.log(result)
    }

    checkAuthAndGetToken();
  }, [isLoaded, isSignedIn, router, getToken]);

  if (!isLoaded || !isSignedIn || !token) {
    return (
      <div className="w-full h-full mt-3 min-h-min border-[0.5] border-purple-200 shadow-xl flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <SelectedPolicyProvider>
      <div className="w-full h-[90%] flex bg-[linear-gradient(0deg,black,black,black,var(--primary),purple,rgb(90,0,90))]">
        <div className="flex-2 p-2 h-full bg-[linear-gradient(-135deg,black,black,var(--primary),rgb(90,0,90),purple)]">
          <Assistant userId={userId} policies={policyList} age={age} gender={gender} cardiovascular_score={cardiovascular_score} diabetes_score={diabetes_score}/>
        </div>
        <div
          className="h-full flex-1 flex w-min min-w-[1090px] bg-transparent flex-col overflow-y-scroll shadow-2xl z-30 shadow-black
      "
        >
          <div className="bg-white w-full min-h-[70px] h-[70px] shadow-lg z-[60] flex items-center justify-center pl-5 gap-3">
            <SearchForm searchValue={""} />
            <div className="flex-1 h-full p-3">
              <CategoryBar selected={"custom"} />
            </div>
          </div>
          <ListedProducts policies={policyList || []} />
        </div>
      </div>
    </SelectedPolicyProvider>
  );
};

export default ProductsPage;
