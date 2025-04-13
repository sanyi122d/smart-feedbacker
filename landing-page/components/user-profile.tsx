import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function UserProfile() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Manage your personal information and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="relative h-24 w-24">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 opacity-75 blur"></div>
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-muted text-4xl font-semibold">
              A
            </div>
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-semibold">Alex Johnson</h3>
            <p className="text-sm text-muted-foreground">alex.johnson@example.com</p>
            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-teal-500/20 hover:bg-teal-500/10">
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  )
}
