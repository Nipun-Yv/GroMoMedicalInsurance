
import HomePageContent from "@/components/HomePageContent";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";


export default function Home() {
  return (
    <div className="w-full h-full flex">
      <HomePageContent/>
      <Sidebar/>
    </div>
  );
}
