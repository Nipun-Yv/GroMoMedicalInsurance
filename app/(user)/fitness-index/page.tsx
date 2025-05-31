"use client"
import { GoogleFitForm } from "@/components/GoogleFitForm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSelectedPolicy } from "@/contexts/SelectedPolicyContext"
import { useState } from "react"

type Message = {
  from: "user" | "bot"
  text: string
}
const FitnessEvalution= () => {
  const [description, setDescription] = useState<string>("")
  const [showDiscounts,setShowDiscounts]=useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])
  const baseUrl=process.env.NEXT_PUBLIC_FASTAPI_BASE_URL

  async function fetchChatResponse(prompt: string) {
    return new Promise<string>((resolve) =>
      setTimeout(() => resolve(`You asked: "${prompt}" ✨`), 1000)
    )
  }

  const handleSend = async () => {
    if (!description.trim()) return

    setMessages((prev) => [...prev, { from: "user", text: description }])
    setDescription("")
    // const {data}= await axios.post(`${baseUrl}/chat-message`,{user_id:userId,query:description,selected_pdf:selectedPolicy})
    // if(data.tool_used=="fetch_discounts"){
    //   // setMessages((prev) => [...prev, { from: "bot", text: data.message }])
    //   setShowDiscounts(true)
    // }
    // else if(data.tool_used=="reduce_tier"){
    //   setMessages((prev) => [...prev, { from: "bot", text: data.message }])
    // }
    // else{
    //   setMessages((prev) => [...prev, { from: "bot", text: data.message }])
    // }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  return (
    <div className="w-full flex justify-center min-w-full h-full">
        <GoogleFitForm/>
        <div className="h-[7.5%] w-[40%] border-[0.5] border-purple-400 h-min-h pr-4 flex fixed bottom-5 left-[30%] z-75 bg-white shadow-gray-600 shadow-2xl rounded-lg">
        <Input
          name="description"
          placeholder="Type your query here"
          className="border-[0.5] text-gray-600 flex-6 h-full rounded-r-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="border-l-[0.5] w-min-w h-full text-black bg-white font-extralight rounded-l-none hover:bg-white hover:cursor-pointer flex-1"
          onClick={handleSend}
          aria-label="Send message"
        >
          <img src="/SendIcon.png" alt="Send" className="h-6 w-6 max-h-6 max-w-6" />
        </Button>
      </div>
    </div>
  )
}

export default FitnessEvalution