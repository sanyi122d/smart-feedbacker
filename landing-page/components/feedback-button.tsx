import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FeedbackButton() {
  return (
    <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
      <MessageSquare className="mr-2 h-4 w-4" />
      Give Feedback
    </Button>
  )
}
