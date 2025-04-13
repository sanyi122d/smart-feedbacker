"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DashboardShell } from "@/components/dashboard-shell"
import { ChatbotButton } from "@/components/chatbot-button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertTriangle, MessageSquare, Sparkles } from "lucide-react"

// Sample feedback data for admin dashboard (fallback)
const sampleFeedbackItems = [
  {
    id: 1,
    name: "John Smith",
    feedback: "The room was very clean and comfortable. Staff was friendly and helpful.",
    sentiment: "Positive",
    status: "Logged",
    timestamp: "10:23 AM",
    room: "203",
  },
  {
    id: 2,
    name: "Maria Garcia",
    feedback: "The WiFi was not working properly in my room. I had to use my mobile data.",
    sentiment: "Negative",
    status: "Escalated",
    timestamp: "11:45 AM",
    room: "415",
  },
  {
    id: 3,
    name: "Robert Johnson",
    feedback: "Breakfast was excellent, but the coffee machine was out of order.",
    sentiment: "Neutral",
    status: "In Progress",
    timestamp: "9:15 AM",
    room: "127",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [feedbackItems, setFeedbackItems] = useState(sampleFeedbackItems)
  const [stats, setStats] = useState({
    total: sampleFeedbackItems.length,
    positive: sampleFeedbackItems.filter((item) => item.sentiment === "Positive").length,
    negative: sampleFeedbackItems.filter((item) => item.sentiment === "Negative").length,
    neutral: sampleFeedbackItems.filter((item) => item.sentiment === "Neutral").length,
    resolved: sampleFeedbackItems.filter((item) => item.status === "Resolved").length,
  })

  useEffect(() => {
    // Check if user is admin
    const userRole = localStorage.getItem("userRole")
    setIsAdmin(userRole === "admin")

    // Get feedback items from localStorage
    const storedFeedback = localStorage.getItem("feedbackItems")
    if (storedFeedback) {
      const parsedFeedback = JSON.parse(storedFeedback)
      setFeedbackItems(parsedFeedback)

      // Update stats
      setStats({
        total: parsedFeedback.length,
        positive: parsedFeedback.filter((item: any) => item.sentiment === "Positive").length,
        negative: parsedFeedback.filter((item: any) => item.sentiment === "Negative").length,
        neutral: parsedFeedback.filter((item: any) => item.sentiment === "Neutral").length,
        resolved: parsedFeedback.filter((item: any) => item.status === "Resolved").length,
      })
    }
  }, [])

  const handleGiveFeedback = () => {
    router.push("/dashboard/feedback")
  }

  const handleOpenChatbot = () => {
    router.push("/dashboard/chatbot")
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    // Update state
    const updatedItems = feedbackItems.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    setFeedbackItems(updatedItems)

    // Update localStorage
    localStorage.setItem("feedbackItems", JSON.stringify(updatedItems))

    // Update stats
    setStats({
      total: updatedItems.length,
      positive: updatedItems.filter((item) => item.sentiment === "Positive").length,
      negative: updatedItems.filter((item) => item.sentiment === "Negative").length,
      neutral: updatedItems.filter((item) => item.sentiment === "Neutral").length,
      resolved: updatedItems.filter((item) => item.status === "Resolved").length,
    })
  }

  // Admin Dashboard
  if (isAdmin) {
    return (
      <DashboardShell>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage guest feedback across the hotel. AI-powered sentiment analysis helps prioritize issues.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">Feedback items received</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Positive</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.positive}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.total > 0 ? Math.round((stats.positive / stats.total) * 100) : 0}% of total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Neutral</CardTitle>
                <Sparkles className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.neutral}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.total > 0 ? Math.round((stats.neutral / stats.total) * 100) : 0}% of total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Negative</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.negative}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.total > 0 ? Math.round((stats.negative / stats.total) * 100) : 0}% of total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.resolved}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}% resolution rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Table */}
          <Card>
            <CardHeader>
              <CardTitle>Guest Feedback</CardTitle>
              <CardDescription>
                AI-analyzed guest feedback with sentiment detection. Negative feedback is automatically escalated.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {feedbackItems.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Guest</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Feedback</TableHead>
                        <TableHead>AI Sentiment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feedbackItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.timestamp}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.room}</TableCell>
                          <TableCell className="max-w-xs truncate">{item.feedback}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.sentiment === "Positive"
                                  ? "bg-green-100 text-green-800"
                                  : item.sentiment === "Negative"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {item.sentiment}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.status === "Escalated"
                                  ? "bg-red-100 text-red-800"
                                  : item.status === "Resolved"
                                    ? "bg-green-100 text-green-800"
                                    : item.status === "In Progress"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {item.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {item.status !== "Resolved" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-green-500/20 hover:bg-green-500/10 text-green-600"
                                  onClick={() => handleStatusChange(item.id, "Resolved")}
                                >
                                  Resolve
                                </Button>
                              )}
                              {item.status !== "In Progress" && item.status !== "Resolved" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 border-blue-500/20 hover:bg-blue-500/10 text-blue-600"
                                  onClick={() => handleStatusChange(item.id, "In Progress")}
                                >
                                  In Progress
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No feedback has been submitted yet.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    )
  }

  // Guest Dashboard
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome, Guest</h1>
          <p className="text-muted-foreground">Submit feedback or chat with our concierge.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feedback Card */}
          <div className="relative overflow-hidden rounded-xl border bg-background p-8 shadow-md transition-all hover:shadow-lg">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-teal-500 to-blue-500"></div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-blue-600 dark:text-blue-400"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Share Your Experience</h2>
                <p className="text-muted-foreground mb-4">
                  We value your feedback! Let us know about your experience or report any issues you've encountered.
                </p>
                <Button
                  className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                  onClick={handleGiveFeedback}
                >
                  Give Feedback
                </Button>
              </div>
            </div>
          </div>

          {/* Concierge Card */}
          <div className="relative overflow-hidden rounded-xl border bg-background p-8 shadow-md transition-all hover:shadow-lg">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-teal-500 to-blue-500"></div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="rounded-full bg-teal-100 p-4 dark:bg-teal-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-teal-600 dark:text-teal-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <path d="M12 17h.01"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Hotel Concierge</h2>
                <p className="text-muted-foreground mb-4">
                  Have questions about hotel services, local attractions, or need assistance? Our AI concierge is here
                  to help.
                </p>
                <Button
                  className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                  onClick={handleOpenChatbot}
                >
                  Chat with Concierge
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Button (Fixed Position) */}
      <ChatbotButton />
    </DashboardShell>
  )
}
