import Link from "next/link";
import services from "../app/data/services.json"
import ServiceCard from "./ServiceCard";
import { GoalIcon, PointerIcon } from "lucide-react";
const HomePageContent = () => {
  return (
    <div
      className="flex-[2.4] w-[100%] rounded-tr-2xl bg-gray-50 z-10 shadow-2xl shadow-white
    flex p-5 h-full"
    >
      <div className="flex-1 h-full rounded-xl shadow-lg border-[0.8] bg-[url('/TailormadeSoftware.png')] p-5 flex items-center justify-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white flex items-center justify-center">
          Medical <br />
          Insurance<br />
          `tailor-fit`
          <br />
          to your needs
        </h1>
      </div>
      <div className="flex-2 h-full ml-5 pb-3">
        <div className="h-[50%] mb-5 rounded-xl shadow-lg border-[0.8] bg-white p-5">
          <h2 className="scroll-m-20 pb-2 text-3xl font-extrabold tracking-tight first:mt-0 text-center p-3 text-gray-600">
            Welcome to <span className="text-purple-400">GroMo Health -</span>
            Your AI-Powered Health Companion
          </h2>
          <p className="text-gray-400 p-5">
GroMo revolutionizes personal wellness by seamlessly integrating with your favorite fitness apps to instantly capture your health metrics. Our intelligent platform evaluates your data to generate a comprehensive health score, then crafts personalized wellness plans tailored specifically to you. With an AI assistant available 24/7, GroMo provides real-time guidance, motivation, and adjustments to help you achieve your health goals faster and more effectively than ever before.
          </p>
          <hr />
        </div>
        <div className="h-[50%] rounded-xl shadow-lg border-[0.8] bg-white items-center justify-center p-3 flex flex-col">
            <Link href="/fitness-index">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-black flex items-center justify-center">
                    Get started<span className="font-extralight flex"> /Fitness Score</span>
                </h1>
            </Link>
            <div className="w-full p-3 flex gap-2 mt-5">
                {services.map((element)=>
                    <ServiceCard key={element.id} service_name={element.service_name} img={element.img}/>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageContent;
