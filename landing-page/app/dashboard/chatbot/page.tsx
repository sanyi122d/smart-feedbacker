"use client"

import { useState, useRef, useEffect } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Clock, Coffee, Utensils, Map, SpadeIcon as Spa, Wifi, Phone, HelpCircle } from "lucide-react"

// Suggested prompts for hotel guests
const suggestedPrompts = [
  { icon: <Clock size={16} />, text: "What are the check-in and check-out times?" },
  { icon: <Coffee size={16} />, text: "What time is breakfast served?" },
  { icon: <Utensils size={16} />, text: "Can you recommend restaurants nearby?" },
  { icon: <Map size={16} />, text: "What attractions are close to the hotel?" },
  { icon: <Spa size={16} />, text: "How do I book a spa treatment?" },
  { icon: <Wifi size={16} />, text: "What's the WiFi password?" },
  { icon: <Phone size={16} />, text: "How can I contact room service?" },
]

// Pre-defined responses for the chatbot
const botResponses = {
  greeting: [
    "Hello! Welcome to SmartFeedBacker's AI assistant. How can I help you with your stay today?",
    "Hi there! I'm your virtual concierge. What can I assist you with during your stay?",
    "Welcome! I'm here to make your stay exceptional. What information do you need?",
  ],
  checkInOut: [
    "Our standard check-in time is 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request, subject to availability. Would you like me to check if this is possible for your stay?",
  ],
  breakfast: [
    "Breakfast is served in our main restaurant from 6:30 AM to 10:30 AM on weekdays, and from 7:00 AM to 11:00 AM on weekends. We offer both buffet and à la carte options. Would you like to see the menu?",
  ],
  restaurants: [
    "We have several excellent restaurants nearby! Within walking distance, I'd recommend 'The Coastal Kitchen' for seafood, 'Bella Italia' for Italian cuisine, and 'Spice Garden' for local dishes. Would you like more specific recommendations or directions to any of these?",
  ],
  attractions: [
    "There are many attractions near our hotel! The city center is just 10 minutes away, with museums and shopping. The beach is a 5-minute walk. There's also a historic district about 15 minutes by taxi. Would you like more information about any specific attraction?",
  ],
  spa: [
    "You can book a spa treatment by calling extension 4500 from your room phone, visiting the spa reception on the 2nd floor, or I can help you book right now. Our most popular treatments include hot stone massage, aromatherapy, and our signature facial. What type of treatment are you interested in?",
  ],
  wifi: [
    "The WiFi network name is 'Hotel_Guest' and the password is 'welcome2023'. If you have any connectivity issues, please let me know and I'll connect you with our IT support team.",
  ],
  roomService: [
    "You can contact room service by dialing extension 2100 from your room phone. Our room service is available 24/7. Would you like to see the room service menu?",
  ],
  fallback: [
    "Thank you for your question. I'll connect you with our guest services team who can provide you with more detailed information. Is there anything else I can help you with in the meantime?",
    "I appreciate your inquiry. Our staff at the front desk would be the best resource for this specific question. Would you like me to notify them that you'll be reaching out?",
    "That's a great question. For the most accurate and up-to-date information, I recommend speaking with our concierge team. Is there anything else I can assist you with today?",
  ],
}

type Message = {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)],
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot thinking
    setTimeout(
      () => {
        let botResponse = ""

        // Simple keyword matching for demo purposes
        const lowerInput = input.toLowerCase()
        if (lowerInput.includes("check-in") || lowerInput.includes("check-out") || lowerInput.includes("checkout")) {
          botResponse = botResponses.checkInOut[0]
        } else if (lowerInput.includes("breakfast") || lowerInput.includes("morning meal")) {
          botResponse = botResponses.breakfast[0]
        } else if (lowerInput.includes("restaurant") || lowerInput.includes("eat") || lowerInput.includes("food")) {
          botResponse = botResponses.restaurants[0]
        } else if (
          lowerInput.includes("attraction") ||
          lowerInput.includes("visit") ||
          lowerInput.includes("tour") ||
          lowerInput.includes("see")
        ) {
          botResponse = botResponses.attractions[0]
        } else if (lowerInput.includes("spa") || lowerInput.includes("massage") || lowerInput.includes("treatment")) {
          botResponse = botResponses.spa[0]
        } else if (lowerInput.includes("wifi") || lowerInput.includes("internet") || lowerInput.includes("password")) {
          botResponse = botResponses.wifi[0]
        } else if (
          lowerInput.includes("room service") ||
          lowerInput.includes("order food") ||
          lowerInput.includes("deliver")
        ) {
          botResponse = botResponses.roomService[0]
        } else {
          // Fallback response
          botResponse = botResponses.fallback[Math.floor(Math.random() * botResponses.fallback.length)]
        }

        const assistantMessage: Message = {
          role: "assistant",
          content: botResponse,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  const handlePromptClick = (promptText: string) => {
    setInput(promptText)
  }

  return (
    <DashboardShell>
      <div className="flex flex-col h-[calc(100vh-10rem)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 opacity-75 blur"></div>
              <div className="relative p-2 bg-white rounded-full">
                <Bot className="h-6 w-6 text-teal-600" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Hotel Concierge Assistant</h1>
              <p className="text-sm text-muted-foreground">Ask me anything about your stay or local recommendations</p>
            </div>
          </div>
        </div>

        {/* Chat container */}
        <div className="flex-1 overflow-y-auto border rounded-lg bg-background mb-4 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} items-start gap-2`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white">
                    <Bot size={18} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white"
                      : "bg-muted border"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start items-start gap-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white">
                  <Bot size={18} />
                </div>
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted border">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested prompts */}
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="border-teal-500/20 hover:bg-teal-500/10 text-xs"
              onClick={() => handlePromptClick(prompt.text)}
            >
              {prompt.icon}
              <span className="ml-1">{prompt.text}</span>
            </Button>
          ))}
        </div>

        {/* Input area */}
        <div className="flex gap-2">
          <Input
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="border-teal-500/20 focus-visible:ring-teal-500/50"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>

        {/* Help text */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <HelpCircle size={12} />
            <span>
              For urgent assistance, please contact the front desk by dialing <strong>0</strong> from your room phone
            </span>
          </p>
        </div>
      </div>
    </DashboardShell>
  )
}
