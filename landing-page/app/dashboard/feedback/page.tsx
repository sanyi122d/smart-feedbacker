"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Sparkles } from "lucide-react"

// Enhanced sentiment analysis with more sophisticated patterns
const sentimentAnalysis = {
  // Expanded positive keywords with weights
  positive: {
    strong: [
      "excellent",
      "outstanding",
      "amazing",
      "exceptional",
      "fantastic",
      "perfect",
      "wonderful",
      "delightful",
      "superb",
    ],
    medium: [
      "good",
      "great",
      "nice",
      "pleasant",
      "comfortable",
      "clean",
      "helpful",
      "friendly",
      "satisfied",
      "enjoy",
      "enjoyed",
      "love",
      "loved",
    ],
    mild: ["decent", "fine", "okay", "ok", "acceptable", "adequate", "satisfactory"],
  },
  // Expanded negative keywords with weights
  negative: {
    strong: [
      "terrible",
      "horrible",
      "awful",
      "dreadful",
      "unacceptable",
      "disgusting",
      "appalling",
      "atrocious",
      "abysmal",
    ],
    medium: [
      "bad",
      "poor",
      "disappointing",
      "uncomfortable",
      "dirty",
      "unhelpful",
      "unfriendly",
      "rude",
      "slow",
      "broken",
      "issue",
      "problem",
      "complaint",
    ],
    mild: ["mediocre", "subpar", "lacking", "underwhelming", "not great", "could be better"],
  },
  // Negation words that flip sentiment
  negations: [
    "not",
    "no",
    "never",
    "don't",
    "doesn't",
    "didn't",
    "wasn't",
    "weren't",
    "isn't",
    "aren't",
    "can't",
    "couldn't",
    "shouldn't",
    "wouldn't",
  ],
  // Intensifiers that strengthen sentiment
  intensifiers: ["very", "extremely", "really", "truly", "absolutely", "completely", "totally", "highly", "especially"],
}

// More sophisticated sentiment analysis function
function analyzeAISentiment(text: string) {
  const lowerText = text.toLowerCase()
  const words = lowerText.split(/\s+/)
  let score = 0
  let hasNegation = false
  let hasIntensifier = false

  // Process text in chunks to handle negations better
  for (let i = 0; i < words.length; i++) {
    const word = words[i]

    // Check for negations
    if (sentimentAnalysis.negations.includes(word)) {
      hasNegation = true
      continue
    }

    // Check for intensifiers
    if (sentimentAnalysis.intensifiers.includes(word)) {
      hasIntensifier = true
      continue
    }

    // Check positive words
    if (sentimentAnalysis.positive.strong.some((term) => word.includes(term))) {
      score += hasNegation ? -3 : hasIntensifier ? 3 : 2
    } else if (sentimentAnalysis.positive.medium.some((term) => word.includes(term))) {
      score += hasNegation ? -2 : hasIntensifier ? 2 : 1
    } else if (sentimentAnalysis.positive.mild.some((term) => word.includes(term))) {
      score += hasNegation ? -1 : hasIntensifier ? 1 : 0.5
    }

    // Check negative words
    if (sentimentAnalysis.negative.strong.some((term) => word.includes(term))) {
      score -= hasNegation ? -3 : hasIntensifier ? 3 : 2
    } else if (sentimentAnalysis.negative.medium.some((term) => word.includes(term))) {
      score -= hasNegation ? -2 : hasIntensifier ? 2 : 1
    } else if (sentimentAnalysis.negative.mild.some((term) => word.includes(term))) {
      score -= hasNegation ? -1 : hasIntensifier ? 1 : 0.5
    }

    // Reset negation and intensifier flags after processing a sentiment word
    if (score !== 0) {
      hasNegation = false
      hasIntensifier = false
    }
  }

  // Check for specific phrases that indicate sentiment
  if (lowerText.includes("thank you") || lowerText.includes("thanks")) score += 1
  if (lowerText.includes("would recommend")) score += 1.5
  if (lowerText.includes("would not recommend")) score -= 1.5
  if (lowerText.includes("will come back") || lowerText.includes("will return")) score += 1.5
  if (lowerText.includes("will not come back") || lowerText.includes("will not return")) score -= 1.5

  // Determine sentiment category based on score
  if (score > 1) return "Positive"
  if (score < -0.5) return "Negative"
  return "Neutral"
}

type FeedbackItem = {
  id: number
  name: string
  feedback: string
  sentiment: string
  status: string
  timestamp: string
  room?: string
}

export default function FeedbackPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    feedback: "",
    room: "203", // Default room number
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [sentiment, setSentiment] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    // Check if user is admin
    const userRole = localStorage.getItem("userRole")
    setIsAdmin(userRole === "admin")

    // Pre-fill name if available
    const userName = localStorage.getItem("userName")
    if (userName) {
      setFormData((prev) => ({ ...prev, name: userName }))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)
      setIsAnalyzing(true)

      // Simulate AI processing time
      setTimeout(() => {
        // Analyze sentiment using our enhanced AI-like function
        const detectedSentiment = analyzeAISentiment(formData.feedback)
        setSentiment(detectedSentiment)
        setIsAnalyzing(false)

        // Create feedback item
        const newFeedbackItem: FeedbackItem = {
          id: Date.now(),
          name: formData.name,
          feedback: formData.feedback,
          sentiment: detectedSentiment,
          status: detectedSentiment === "Negative" ? "Escalated" : "Logged",
          timestamp: new Date().toLocaleTimeString(),
          room: formData.room,
        }

        // Store in localStorage for admin dashboard
        const existingFeedback = JSON.parse(localStorage.getItem("feedbackItems") || "[]")
        localStorage.setItem("feedbackItems", JSON.stringify([newFeedbackItem, ...existingFeedback]))

        // Store user name for future use
        localStorage.setItem("userName", formData.name)

        // Simulate API call with timeout
        setTimeout(() => {
          setIsSubmitting(false)
          setIsSubmitted(true)

          // Reset form after submission
          setFormData({
            name: formData.name, // Keep the name
            feedback: "",
            room: formData.room, // Keep the room
          })
        }, 500)
      }, 1500) // Simulate AI processing time
    }
  }

  const handleNewFeedback = () => {
    setIsSubmitted(false)
    setSentiment(null)
  }

  return (
    <DashboardShell>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Guest Feedback Kiosk</h1>
            <p className="text-muted-foreground mt-2">
              We value your input! Please share your thoughts or report any issues you've encountered.
            </p>
          </div>

          {isSubmitted ? (
            <Alert className="p-6 bg-green-50 text-green-800 border-green-200">
              <div className="flex flex-col items-center text-center gap-2">
                <CheckCircle2 className="h-12 w-12 text-green-600 mb-2" />
                <h3 className="text-xl font-semibold">Thank You for Your Feedback!</h3>
                <AlertDescription className="text-base">
                  Your feedback has been received and will be reviewed by our team.
                  <br />
                  <Button
                    onClick={handleNewFeedback}
                    className="mt-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                  >
                    Submit Another Feedback
                  </Button>
                </AlertDescription>
              </div>
            </Alert>
          ) : (
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 opacity-20 blur-md"></div>
              <div className="relative rounded-lg border bg-background p-6 shadow-md">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name:</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      className={`border-teal-500/20 focus-visible:ring-teal-500/50 ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="room">Room Number:</Label>
                    <Input
                      id="room"
                      name="room"
                      placeholder="Enter your room number"
                      className="border-teal-500/20 focus-visible:ring-teal-500/50"
                      value={formData.room}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback">Your Feedback:</Label>
                    <Textarea
                      id="feedback"
                      name="feedback"
                      placeholder="Write your experience here..."
                      className={`min-h-[150px] border-teal-500/20 focus-visible:ring-teal-500/50 ${
                        errors.feedback ? "border-red-500" : ""
                      }`}
                      value={formData.feedback}
                      onChange={handleChange}
                    />
                    {errors.feedback && <p className="text-sm text-red-500 mt-1">{errors.feedback}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        {isAnalyzing ? (
                          <>
                            <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                            <span>Processing Feedback...</span>
                          </>
                        ) : (
                          <span>Submitting...</span>
                        )}
                      </div>
                    ) : (
                      "Submit Feedback"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
