"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";

type Category = "dataset" | "component" | "template" | "custom" | "any";
const CategoryBar = ({ selected }: { selected: Category }) => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [showRedeem, setShowRedeem] = useState<string | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const submitCode = async () => {
    try {
      const response = await axios.post(`${baseUrl}/coupons/redeem`, {
        discountCode:couponCode,
      });
      console.log(response.data)
      setShowRedeem(response.data.couponId)
    } catch (err: any) {
      if (err.response?.status == 404) {
        setCouponCode("Invalid code");
      }
    }
  };
  if (showRedeem) {
    return (
    <div
      className="flex rounded-md h-full items-center shadow-md p-1 font-light border-1
    text-gray-600 bg-purple-900"
    >
      <p className="text-white font-extralight text-center w-full">Your coupon for a {showRedeem} has been applied!</p>
    </div>)
  }
  return (
    <div
      className="flex rounded-md h-full items-center shadow-md p-1 font-light border-1
    text-gray-600"
    >
      <Input
        placeholder="Enter your coupon code to redeem add ons"
        value={couponCode}
        onChange={(e) => {
          setCouponCode(e.target.value);
        }}
      />
      <Button
        variant="outline"
        className="border-purple-400 ml-1"
        onClick={submitCode}
      >
        Submit
      </Button>
    </div>
  );
};

const OptionDecorator = ({
  category,
  selected,
}: {
  category: Category;
  selected: Category;
}) => {
  return (
    <a
      href={`/products/?category=${category}`}
      className={`${
        selected == category && "text-purple-500 rounded-md"
      } h-full flex-1
      px-3 flex
      justify-center items-center`}
    >
      {toTitleCase(category)}
    </a>
  );
};
const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
export default CategoryBar;
