"use client"
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const TickBox = ({
  field,
  setDiscountList,
  description
}: {
  field: string;
  setDiscountList: React.Dispatch<React.SetStateAction<string[]>>
  description:string;
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    setDiscountList((prev) =>
      isChecked ? [...prev, field] : prev.filter((element) => element !== field)
    );
  };
  return (
    <div
      className={`flex-1 h-[70px] min-w-[200px] border-1 rounded-md pl-3 flex text-gray-400
items-center ${
        checked
          ? "border-purple-700 text-purple-700 font-medium"
          : "border-gray-300 text-gray-400"
      } flex gap-2`}
    >
      <Input
        type="checkbox"
        className="w-[16px] shadow-none accent-purple-700 text-[12px] hover:cursor-pointer"
        onChange={handleChange}
      />
      <div className="flex flex-col ">
        <h3 className="text-md">{field}</h3>
        <p className="text-[9px]">{description}</p>
      </div>
    </div>
  );
};
const DiscountBox = ({setShowDiscounts,showDiscounts}:{setShowDiscounts:React.Dispatch<React.SetStateAction<boolean>>,showDiscounts:boolean}) => {
const submitList=()=>{
    setShowDiscounts(false)
}
const [discountList, setDiscountList] = useState<string[]>([]);
  return (
     <div hidden={!showDiscounts}
          className="w-full overflow-y-scroll bg-white rounded-xl shadow-md flex flex-wrap gap-2 justify-center items-center
      p-2 min-h-[400px]"
        >
          <TickBox field="Medical Practioner Discount" description="Get 5% discount if any of the insured person is a medical practitioner" setDiscountList={setDiscountList} />
          <TickBox field="Aggregate Deductible" description="Get a discount on your insurance premium when you agree to pay a certain aggregate deductible amount" setDiscountList={setDiscountList} />
          <TickBox field="Voluntary Co-payment" description="Co-payment is the percentage of the claim that the insured agrees to pay from his/her pocket" setDiscountList={setDiscountList} />
          <TickBox field="Voluntary Deductible" description="Get a discount on your insurance premium when you agree to pay a certain deductible amount on aggregate basis" setDiscountList={setDiscountList} />
          <Button className="w-full h-[45px] bg-purple-900" onClick={submitList}>
            Add Discounts
          </Button>
    </div>
  )
}

export default DiscountBox