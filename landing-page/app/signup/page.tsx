"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LanguageSelectorField } from "@/components/language-selector-field"

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    language: { code: "en", name: "English", flag: "🇺🇸" },
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    // Clear error when user types
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }))
    }
  }

  const handleLanguageChange = (language: { code: string; name: string; flag: string }) => {
    setFormData((prev) => ({ ...prev, language }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.password.trim()) newErrors.password = "Password is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Store signup data in localStorage to pass to login page
      localStorage.setItem(
        "signupData",
        JSON.stringify({
          email: formData.email,
          name: formData.name,
          password: formData.password,
        }),
      )

      // Simulate API call with timeout
      setTimeout(() => {
        setIsSubmitting(false)
        router.push("/login")
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
              Create Your Account
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Sign up to start collecting real-time guest feedback</p>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 opacity-20 blur-md"></div>
            <div className="relative rounded-lg border bg-background p-6 shadow-md">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className={`border-teal-500/20 focus-visible:ring-teal-500/50 ${errors.name ? "border-red-500" : ""}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a secure password"
                    className={`border-teal-500/20 focus-visible:ring-teal-500/50 ${errors.password ? "border-red-500" : ""}`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className={`border-teal-500/20 focus-visible:ring-teal-500/50 ${errors.phone ? "border-red-500" : ""}`}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Preferred Language</Label>
                  <LanguageSelectorField selectedLanguage={formData.language} onLanguageChange={handleLanguageChange} />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Sign Up"}
                </Button>
              </form>
            </div>
          </div>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-teal-500 hover:text-teal-600 font-medium">
              Log in
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
