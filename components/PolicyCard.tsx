"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, CircleXIcon, PlusSquareIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Policy } from "@/types/policy";
import { useEffect, useState } from "react";
import { useSelectedPolicy } from "@/contexts/SelectedPolicyContext";
const featureList = [
  "Guaranteed 7x increase in cover amount over 5 years with Cumulative Bonus Super RiderSee how ",
  "Waiting period of 3 years for existing disease(s)",
  "No Room Rent Limit",
  "Unlimited Restoration of cover",
];
const PolicyCard = ({ policy, index }: { policy: Policy; index: number }) => {
  const featureList = policy.description.split(";");
  const { setSelectedPolicy } = useSelectedPolicy();
  const [open, setOpen] = useState<boolean>(false);
  const handlePolicyDocumentSelection = (isOpen: boolean) => {
    if (isOpen) {
      setSelectedPolicy(policy.name);
      setOpen(true);
    } 
  };
  return (
    <div className="h-[425px] w-[490px] shadow-xl bg-gray-50 rounded-lg flex flex-col">
      <div className="h-[80%] w-full flex">
        <div className="w-[73%] h-full bg-white rounded-tl-lg rounded-br-lg shadow-md z-10">
          <div className="w-full h-[50%] overflow-y-scroll p-3 pt-4 pr-5">
            <h3 className="text-gray-800 font-medium" onClick={()=>setOpen(false)}>{policy.name}</h3>
            <ul className="ml-4 flex flex-col gap-1 mt-3">
              {featureList.map((element, index) => {
                if (index == 0) {
                  return (
                    <li
                      className="text-[12px] text-gray-500 flex align-center gap-1"
                      key={index}
                    >
                      <PlusSquareIcon
                        size={14}
                        color="#ffffff"
                        fill="#ff0000"
                        className="min-w-[14px] mt-[3px]"
                      />
                      {element}
                    </li>
                  );
                }
                return (
                  <li
                    className="text-[12px] text-gray-500 flex align-center gap-1"
                    key={index}
                  >
                    <CheckIcon
                      size={14}
                      color="#4ade80"
                      className="min-w-[14px] mt-[3px]"
                    />
                    {element}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-full h-[50%] flex flex-col">
            <div className="w-full flex-1 flex bg-white">
              <div className="flex-1 pl-4">
                <h6 className="text-[14px] text-gray-400">Cover amount</h6>
                <p className="font-medium">
                  ₹{policy.cover_options[0].cover_amount} Lakh
                </p>
              </div>
              <div className="flex-1 pl-4">
                <h6 className="text-[14px] text-gray-400">Premium</h6>
                <p className="font-medium">
                  ₹{Math.ceil(policy.cover_options[0].one_year / 12)}/month
                </p>
                <h6 className="text-[14px] text-gray-400 font-medium">
                  ₹{policy.cover_options[0].one_year} annually
                </h6>
              </div>
            </div>
            <div className="w-full flex-1 p-4">
              <Button
                className="w-full h-[65%] border-purple-300 text-purple-400 hover:cursor-pointer hover:bg-purple-300 hover:text-white"
                variant="outline"
              >
                Customise Plan
              </Button>
              <p className="text-purple-300 text-[13px] text-center mt-2">
                Applicable for 5% direct discount
              </p>
            </div>
          </div>
        </div>
        <div className="h-full w-[27%] bg-white rounded-r-xl">
          <div className="w-full aspect-square bg-white rounded-r-xl shadow-lg p-3 flex flex-col justify-center items-center">
            <Popover open={open} onOpenChange={handlePolicyDocumentSelection}>
              <PopoverTrigger className="relative w-full rounded-sm">
                <img src={policy.image_url}/>
              </PopoverTrigger>

              <PopoverContent
                side={undefined} // prevent default positioning
                align={undefined}
                className="p-0 rounded-md w-[700px] shadow-2xl shadow-black h-[1000px]"
                style={{
                  position: "fixed",
                  top: "-100px",
                  left: index % 2 == 1 ? "-600px" : "-300px",
                  zIndex: 50,
                }}
              >
                <div className="flex justify-center items-center rounded-md p-2 bg-white shadow-xl w-min-w h-min-h w-full relative">
                  <CircleXIcon
                    fill="#ffffff"
                    color="#bbbbbb"
                    className="absolute -top-1 -right-1 w-[3] h-[3] bg-purple-300 rounded-full shadow-md"
                    onClick={()=>setOpen(false)}
                  />
                  <iframe
                    src={policy.policy_document_url}
                    className="w-[700px] h-[1000px]"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <ul className="flex flex-col gap-1 mt-2 p-2">
            {policy.riders.map((rider) => (
              <Popover key={rider.id}>
                <PopoverTrigger className="relative w-full rounded-sm">
                  <li
                    className="w-full text-purple-400 font-medium text-sm h-[35px] bg-white
                border-purple-400 border-1 flex justify-center items-center rounded-sm hover:cursor-pointer text-[9px]"
                  >
                    {rider.name}
                  </li>
                  <CircleXIcon
                    fill="#ffffff"
                    color="#D8B4FE"
                    className="absolute -top-1 -right-1 w-3 h-3 bg-purple-300 rounded-full shadow-md"
                  />
                </PopoverTrigger>

                <PopoverContent className="text-gray-400 text-[12px] justify-center items-center p-[0.75] rounded-md">
                  <div className="flex justify-center items-center rounded-md p-2 bg-white shadow-xl">
                    {rider.description}
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-1 p-3 gap-2 bg-gray-50 rounded-xl">
        {/* max 2 */}
        <div className="flex-1 rounded-md shadow-md border-1 h-full p-2 pt-1 flex flex-col overflow-y-scroll bg-white">
          <h2 className="text-sm font-medium text-gray-400">OPD Care Silver</h2>
          <p className="text-[9px] text-gray-400 font-extralight">
            OPD Expenses for any pre-existing disease will be covered after 3
            years Initial waiting period of 30 days is applicable.
          </p>
        </div>
        <div className="flex-1 rounded-md shadow-md border-1 h-full p-2 pt-1 flex flex-col overflow-y-scroll bg-white">
          <h2 className="text-sm font-medium text-gray-400">OPD Care Silver</h2>
          <p className="text-[9px] text-gray-400 font-extralight">
            OPD Expenses for any pre-existing disease will be covered after 3
            years Initial waiting period of 30 days is applicable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PolicyCard;
