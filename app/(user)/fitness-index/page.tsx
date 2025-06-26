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
    </div>
  )
}

export default FitnessEvalution