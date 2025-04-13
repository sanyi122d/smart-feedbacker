"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, Info } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    accountType: "guest",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  // Check for signup data on component mount
  useEffect(() => {
    const signupData = localStorage.getItem("signupData")
    if (signupData) {
      const parsedData = JSON.parse(signupData)
      setFormData({
        email: parsedData.email || "",
        name: parsedData.name || "",
        password: parsedData.password || "",
        accountType: "guest",
      })
      setIsAdmin(parsedData.isAdmin || false)
      setSignupSuccess(true)
      // Clear the data after using it
      localStorage.removeItem("signupData")
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    // Clear error when user types
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }))
    }
  }

  const handleAccountTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, accountType: value }))
    // Clear errors when switching account types
    setErrors({})
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.accountType === "guest") {
      if (!formData.email.trim()) newErrors.email = "Email is required"
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.password.trim()) newErrors.password = "Password is required"
    } else {
      // Admin validation
      if (formData.name !== "admin_smart") {
        newErrors.name = "Invalid admin username"
      }
      if (formData.password !== "987654321@smart") {
        newErrors.password = "Invalid admin password"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Store user type in localStorage to maintain admin state
      const isAdminLogin =
        formData.accountType === "admin" && formData.name === "admin_smart" && formData.password === "987654321@smart"

      localStorage.setItem("userRole", isAdminLogin ? "admin" : "guest")

      // Simulate API call with timeout
      setTimeout(() => {
        setIsSubmitting(false)
        router.push("/dashboard")
      }, 1000)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted">
      <div className="container flex flex-1 items-center justify-center py-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 opacity-75 blur"></div>
              <div className="relative">
                <Image
                  src="/flowing-forms.png"
                  alt="SmartFeedBacker Logo"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Log in to your SmartFeedBacker account</p>
          </div>

          <div className="space-y-3 mb-4">
            <Label>Account Type</Label>
            <RadioGroup
              defaultValue="guest"
              value={formData.accountType}
              onValueChange={handleAccountTypeChange}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="guest" id="guest" />
                <Label htmlFor="guest" className="cursor-pointer">
                  Guest
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin" className="cursor-pointer">
                  Administrator
                </Label>
              </div>
            </RadioGroup>
          </div>

          {formData.accountType === "admin" && (
            <Alert className="bg-blue-50 text-blue-800 border-blue-200 mb-4">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                Please enter your admin username and password to access the administrator dashboard.
              </AlertDescription>
            </Alert>
          )}

          {signupSuccess && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>
                {isAdmin
                  ? "Admin account created successfully! Please log in to continue."
                  : "Account created successfully! Please log in to continue."}
              </AlertDescription>
            </Alert>
          )}

          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 opacity-20 blur-md"></div>
            <div className="relative rounded-lg border bg-background p-6 shadow-md">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {formData.accountType === "guest" && (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className={`border-teal-500/20 focus-visible:ring-teal-500/50 ${errors.email ? "border-red-500" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">{formData.accountType === "admin" ? "Admin Username" : "Name"}</Label>
                  <Input
                    id="name"
                    placeholder={formData.accountType === "admin" ? "Enter admin username" : "Enter your name"}
                    className={`border-teal-500/20 focus-visible:ring-teal-500/50 ${errors.name ? "border-red-500" : ""}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{formData.accountType === "admin" ? "Admin Password" : "Password"}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={formData.accountType === "admin" ? "Enter admin password" : "Enter your password"}
                    className={`border-teal-500/20 focus-visible:ring-teal-500/50 ${errors.password ? "border-red-500" : ""}`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <Link href="/forgot-password" className="text-sm text-teal-500 hover:text-teal-600">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                </Button>
              </form>
            </div>
          </div>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-teal-500 hover:text-teal-600 font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <footer className="w-full border-t py-4 bg-background">
        <div className="container flex flex-col items-center justify-center gap-2 text-center md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/flowing-forms.png"
              alt="SmartFeedBacker Logo"
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent font-semibold">
              SmartFeedBacker
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} SmartFeedBacker, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
