"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HealthPredictionForm() {
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

  const [formData, setFormData] = useState({
    // Demographics
    age: "",
    gender: "",

    // Vital Signs
    systolicBP: "",
    diastolicBP: "",

    // Health History
    hypertension: false,
    heartDisease: false,
    diabetes: false,
    otherDisease: false,
    bloodPressure: false,
    // Lifestyle
    smokingHistory: "never",
    alcohol: false,
    physicalActivity: false,
    regularExercise: false,

    // Lab Values
    cholesterol: "1",
    glucose: "1",
    hba1c: "",
    bloodGlucose: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState(null);
  console.log(results)
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await axios.post(
        `${baseUrl}/health/health-prediction`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setResults(response.data.results);
      console.log("results",response.data.results)
      // router.push("/custom-policy")
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isLoaded || !isSignedIn || !token) {
    return (
      <Card className="w-[100vw] h-[100vh] min-h-min shadow-xl flex items-center justify-center">
        <Loader2 className="animate-spin" size="36" />
      </Card>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 px-8 py-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
              <div className="relative z-10">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-3">
                  Advanced Health Analytics
                </h1>
                <p className="text-slate-300 text-lg">
                  Comprehensive AI-powered health risk assessment platform
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-10">
              {/* Demographics Section */}
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="relative">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
                    Personal Information
                  </h2>
                  <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all backdrop-blur-sm shadow-sm"
                      placeholder="Enter your age"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all backdrop-blur-sm shadow-sm"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </motion.section>

              {/* Vital Signs */}
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div className="relative">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
                    Vital Signs
                  </h2>
                  <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Systolic BP (mmHg)
                    </label>
                    <input
                      type="number"
                      name="systolicBP"
                      value={formData.systolicBP}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all backdrop-blur-sm shadow-sm"
                      placeholder="120"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Diastolic BP (mmHg)
                    </label>
                    <input
                      type="number"
                      name="diastolicBP"
                      value={formData.diastolicBP}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all backdrop-blur-sm shadow-sm"
                      placeholder="80"
                    />
                  </div>
                </div>
              </motion.section>

              {/* Health History */}
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <div className="relative">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
                    Health History
                  </h2>
                  <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: "hypertension", label: "Hypertension" },
                    { name: "heartDisease", label: "Heart Disease" },
                    { name: "diabetes", label: "Diabetes" },
                    { name: "bloodPressure", label: "Blood Pressure" },
                    { name: "otherDisease", label: "Other Disease" },
                  ].map((condition) => (
                    <div key={condition.name} className="relative group">
                      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-white/80 to-slate-50/80 border border-slate-200 rounded-xl backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                        <input
                          type="checkbox"
                          name={condition.name}
                          checked={formData[condition.name]}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-purple-600 border-slate-300 rounded focus:ring-purple-500/50"
                        />
                        <label className="text-sm font-semibold text-slate-700 cursor-pointer">
                          {condition.label}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Lifestyle */}
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                <div className="relative">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
                    Lifestyle Factors
                  </h2>
                  <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Smoking History
                    </label>
                    <select
                      name="smokingHistory"
                      value={formData.smokingHistory}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all backdrop-blur-sm shadow-sm"
                    >
                      <option value="never">Never</option>
                      <option value="former">Former</option>
                      <option value="current">Current</option>
                      <option value="not current">Not Current</option>
                      <option value="ever">Ever</option>
                      <option value="no info">No Info</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: "alcohol", label: "Alcohol Consumption" },
                      // {
                      //   name: "physicalActivity",
                      //   label: "Regular Physical Activity",
                      // },
                      // { name: "regularExercise", label: "Regular Exercise" },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center space-x-3 p-3 bg-gradient-to-r from-white/60 to-orange-50/60 rounded-lg backdrop-blur-sm"
                      >
                        <input
                          type="checkbox"
                          name={item.name}
                          checked={formData[item.name]}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-orange-600 border-slate-300 rounded focus:ring-orange-500/50"
                        />
                        <label className="text-sm font-semibold text-slate-700 cursor-pointer">
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* Lab Values */}
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                <div className="relative">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
                    Laboratory Values
                  </h2>
                  <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Cholesterol Level
                    </label>
                    <select
                      name="cholesterol"
                      value={formData.cholesterol}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all backdrop-blur-sm shadow-sm"
                    >
                      <option value="1">Normal</option>
                      <option value="2">Above Normal</option>
                      <option value="3">Well Above Normal</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Glucose Level
                    </label>
                    <select
                      name="glucose"
                      value={formData.glucose}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all backdrop-blur-sm shadow-sm"
                    >
                      <option value="1">Normal</option>
                      <option value="2">Above Normal</option>
                      <option value="3">Well Above Normal</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      HbA1c Level
                    </label>
                    <input
                      type="number"
                      name="hba1c"
                      value={formData.hba1c}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all backdrop-blur-sm shadow-sm"
                      placeholder="6.5"
                      step="0.1"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Blood Glucose
                    </label>
                    <input
                      type="number"
                      name="bloodGlucose"
                      value={formData.bloodGlucose}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all backdrop-blur-sm shadow-sm"
                      placeholder="100"
                    />
                  </div>
                </div>
              </motion.section>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="pt-8"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white font-bold py-5 px-8 rounded-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-500 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span className="text-lg">
                          Processing Health Analysis...
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        Generate Comprehensive Health Report
                      </span>
                    )}
                  </div>
                </button>
              </motion.div>
            </form>

            {/* Results Section */}
{results && (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative mt-12"
  >
    {/* Background Effects */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/20 to-purple-50/30 rounded-3xl"></div>
    <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full blur-3xl"></div>
    
    <div className="relative z-10 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-2xl overflow-hidden">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 px-8 py-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
        <div className="relative z-10 text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-2"
          >
            Comprehensive Health Assessment
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-300 text-lg"
          >
            AI-Powered Risk Analysis & Recommendations
          </motion.p>
        </div>
      </div>

      {/* Results Grid */}
      <div className="p-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cardiovascular Risk Card */}
          {results.cardiovascular && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-red-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 min-h-[350px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                    CARDIOVASCULAR
                  </span>
                </div>
                
                <h4 className="text-lg font-bold text-slate-800 mb-3">
                  Heart Health Assessment
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Risk Level</span>
                    <span className="font-semibold text-red-600">{results.cardiovascular.risk_level}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Probability</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                      {results.cardiovascular.risk_percentage?.toFixed(1)}%
                    </span>
                  </div>
                  
                  {results.cardiovascular.bmi && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">BMI</span>
                      <span className="font-medium text-slate-700">{results.cardiovascular.bmi}</span>
                    </div>
                  )}
                  
                  {results.cardiovascular.pulse_pressure && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Pulse Pressure</span>
                      <span className="font-medium text-slate-700">{results.cardiovascular.pulse_pressure} mmHg</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(results.cardiovascular.risk_percentage || 0, 100)}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Diabetes Risk Card */}
          {results.diabetes && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 min-h-[350px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span 
                    className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: results.diabetes.risk_color || '#3B82F6' }}
                  >
                    DIABETES
                  </span>
                </div>
                
                <h4 className="text-lg font-bold text-slate-800 mb-3">
                  Metabolic Health Status
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Risk Level</span>
                    <span className="font-semibold" style={{ color: results.diabetes.risk_color }}>
                      {results.diabetes.risk_level?.replace(/🟡|🔴|🟢/g, '').trim()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Probability</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {results.diabetes.percentage?.toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(results.diabetes.percentage || 0, 100)}%` }}
                  ></div>
                </div>
                
                {results.diabetes.recommendation && (
                  <div className="mt-4 p-3 bg-blue-50/80 rounded-lg border border-blue-200/50">
                    <p className="text-xs text-blue-800 font-medium">
                      {results.diabetes.recommendation}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Fitness Score Card */}
          {results.fitness && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-emerald-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 min-h-[350px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                    FITNESS
                  </span>
                </div>
                
                <h4 className="text-lg font-bold text-slate-800 mb-3">
                  Physical Wellness Score
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Category</span>
                    <span className="font-semibold text-emerald-600">{results.fitness.risk_category}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Score</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      {results.fitness.risk_score?.toFixed(1)}
                    </span>
                  </div>
                  
                  {results.fitness.confidence_level && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Confidence</span>
                      <span className="font-medium text-slate-700">{results.fitness.confidence_level}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(results.fitness.risk_score || 0, 100)}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8 p-6 bg-gradient-to-r from-slate-50/80 to-blue-50/80 rounded-2xl border border-white/30 backdrop-blur-sm"
        >
          <div className="text-center">
            <h4 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Assessment Complete
            </h4>
            <p className="text-slate-600 text-sm">
              Your comprehensive health analysis has been generated using advanced AI algorithms. 
              Please consult with healthcare professionals for personalized medical advice.
            </p>
          </div>
          <Button className="w-full mt-5 p-6" onClick={()=>{router.push()}}>View AI-Curated and Customised Policies</Button>
        </motion.div>
      </div>
    </div>
  </motion.div>
)}

          </motion.div>
        </div>
      </div>
    </div>
  );
}
