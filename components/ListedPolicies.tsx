import Link from "next/link";
import services from "../app/data/services.json"
import ServiceCard from "./ServiceCard";
import PolicyCard from "./PolicyCard";
// import ProductCard from "./ProductCard";
import { Policy } from "@/types/policy";

const ListedProducts = ({policies}:{policies:Policy[]}) => {
  return (
    <div
      className="w-full
    flex p-5 flex-1 flex-wrap gap-3 justify-start space-y-3 bg-gray-100 h-full justify-center
    overflow-y-scroll"
    >
      {policies.map((policy,index)=>(
        <PolicyCard policy={policy} key={policy.id} index={index}/>
      ))}
    </div>
  );
};

export default ListedProducts;
