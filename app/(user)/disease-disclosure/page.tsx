"use client";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";

const TickBox = ({
  field,
  setDiseaseList,
}: {
  field: string;
  setDiseaseList: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    setDiseaseList((prev) =>
      isChecked ? [...prev, field] : prev.filter((element) => element !== field)
    );
  };
  return (
    <div
      className={`flex-1 h-[21%] min-w-[180px] border-1 rounded-md pl-3 flex text-gray-400
items-center ${
        checked
          ? "border-green-700 text-green-700 font-medium"
          : "border-gray-300 text-gray-400"
      } flex gap-2`}
    >
      <Input
        type="checkbox"
        className="w-[16px] shadow-none accent-green-700 text-[12px] hover:cursor-pointer"
        onChange={handleChange}
      />
      <p className="text-sm">{field}</p>
    </div>
  );
};
const FitnessEvalution = () => {
  const [diseaseList, setDiseaseList] = useState<string[]>([]);
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
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

  if (!isLoaded || !isSignedIn || !token) {
    return (
      <div className="w-[55%] h-[70%] mt-3 min-h-min border-[0.5] border-purple-200 shadow-xl flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const submitForm = async () => {
    try {
      await axios.post(
        `${baseUrl}/health/existing-diseases`,
        { diseaseList },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/custom-policy");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full flex items-center justify-center min-w-full h-full">
      <div className="w-[550px] h-[500px] flex items-center justify-center bg-white rounded-xl flex-col">
        <h2 className="text-2xl font-bold text-gray-600">Medical History</h2>
        <p className="text-gray-400 text-sm">
          Do you have any of the following disease/(s)
        </p>
        <div
          className="w-[500px] h-[340px] bg-white rounded-xl shadow-md flex flex-wrap gap-2 justify-center items-center
      p-2"
        >
          <TickBox field="Diabetes" setDiseaseList={setDiseaseList} />
          <TickBox field="Hypertension" setDiseaseList={setDiseaseList} />
          <TickBox field="Thyroid" setDiseaseList={setDiseaseList} />
          <TickBox field="Blood Pressure" setDiseaseList={setDiseaseList} />
          <TickBox field="Any Surgery" setDiseaseList={setDiseaseList} />
          <TickBox field="Asthma" setDiseaseList={setDiseaseList} />
          <TickBox field="Other disease" setDiseaseList={setDiseaseList} />
          <div
            className={`flex-1 h-[21%] min-w-[180px] rounded-md pl-3 flex text-gray-400
items-center flex gap-2`}
          >
            <p className="text-[11px]">Disclose pre-existing diseases to get better recommendations</p>
          </div>
        </div>
        <Button
          variant={"outline"}
          className="border-1 border-purple-300 mt-4 text-purple-300 font-medium w-[40%] h-[9.5%] hover:cursor-pointer"
          onClick={submitForm}
        >
          Submit Details
        </Button>
      </div>
    </div>
  );
};

export default FitnessEvalution;
