"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bot, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ChatbotButton() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "👋 Hi there! I'm your SmartFeedBacker assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Would you like to use our full chatbot interface for more detailed assistance? I can help with all your hotel-related questions there.",
        },
      ])
    }, 1000)

    setInput("")
  }

  const openFullChatbot = () => {
    router.push("/dashboard/chatbot")
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 p-0 shadow-lg hover:from-teal-600 hover:to-blue-600"
      >
        <Bot className="h-6 w-6" />
        <span className="sr-only">Open Chatbot</span>
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 shadow-xl border-teal-500/20 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Hotel Assistant</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user" ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t p-3 flex flex-col gap-2">
            <form
              className="flex w-full gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
            >
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border-teal-500/20 focus-visible:ring-teal-500/50"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
            <Button
              variant="outline"
              className="w-full border-teal-500/20 hover:bg-teal-500/10"
              onClick={openFullChatbot}
            >
              Open Full Chatbot
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
