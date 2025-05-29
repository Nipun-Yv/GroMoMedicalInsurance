// "use client"
// import { useState } from "react";
// import { Button } from "./ui/button";
// import { Textarea } from "./ui/textarea";
// import { Input } from "./ui/input";
// import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";
// import {  SendIcon } from "lucide-react";

// const SemanticSearch = () => {
//   const [description,setDescription]=useState<string>("")
//   return (
//     <div className="flex h-full rounded-lg items-center justify-center flex-col gap-5">
//       <div className="flex-1 flex justify-center align-center">
//         <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-white border-gray-500 pb-5 p-3 h-full flex flex-col justify-center ">
//           <span className="text-purple-300 w-full"> I'm Aura</span>
//           Ask me about policy docs, add-ons and anything that comes to mind!
//         </h1>
//       </div>
//       <div className="flex h-[7.5%] w-full h-min-h pr-4">
//         <Input name="description" placeholder="Type your description here" className="border-[0.5] text-white flex-3 h-full rounded-r-none" value={description} onChange={(e)=>setDescription(e.target.value)}/>
//         <div className="flex gap-3 h-full aspect-square">
//           <Button className="border-[0.5] w-min-w h-full text-black bg-white font-extralight rounded-l-none hover:bg-white hover:cursor-pointer"><img src="/SendIcon.png" className="h-full aspect-square"/></Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SemanticSearch;
"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

type Message = {
  from: "user" | "bot"
  text: string
}

const SemanticSearch = () => {
  const [description, setDescription] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])


  async function fetchChatResponse(prompt: string) {
    return new Promise<string>((resolve) =>
      setTimeout(() => resolve(`You asked: "${prompt}" ✨`), 1000)
    )
  }

  const handleSend = async () => {
    if (!description.trim()) return

    setMessages((prev) => [...prev, { from: "user", text: description }])
    setDescription("")
    const response = await fetchChatResponse(description)
    setMessages((prev) => [...prev, { from: "bot", text: response }])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-full rounded-lg items-center justify-center flex-col gap-5">
      <div className="flex-1 flex flex-col w-full max-w-xl overflow-auto space-y-4 p-4 rounded-lg shadow-lg gap-3">
        {messages.length === 0 && (
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-white border-gray-500 pb-5 p-3 h-full flex flex-col justify-center ">
          <span className="text-purple-300"> I'm Aura</span>
          Ask me about policy docs, add-ons and anything that comes to mind!
        </h1>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`rounded-md w-full flex text-gray-200 ${msg.from === "user" ? "justify-end" : ""}`}
          >
            <div className={`w-min-w max-w-[75%] p-3 border-[0.5] rounded-lg`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="h-[7.5%] w-full h-min-h pr-4 flex">
        <Input
          name="description"
          placeholder="Type your description here"
          className="border-[0.5] text-white flex-6 h-full rounded-r-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="border-[0.5] w-min-w h-full text-black bg-white font-extralight rounded-l-none hover:bg-white hover:cursor-pointer flex-1"
          onClick={handleSend}
          aria-label="Send message"
        >
          <img src="/SendIcon.png" alt="Send" className="h-6 w-6 max-h-6 max-w-6" />
        </Button>
      </div>
    </div>
  )
}

export default SemanticSearch
