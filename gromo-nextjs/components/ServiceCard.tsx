import React from "react"

const ServiceCard = ({img,service_name}:{img:string,service_name:string}) => {
  return (
    <div className="w-[25%] aspect-square border-1 rounded-md flex items-center justify-center flex-col shadow-xl">
        <img src={img} className="w-[35%] aspect-square"/>
       <p className="w-full text-center text-gray-500 font-extralight">
        {service_name}
       </p>
    </div>
  )
}

export default ServiceCard