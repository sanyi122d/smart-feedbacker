"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <nav className="flex flex-col gap-4 mt-8">
          <Link
            href="#features"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            How It Works
          </Link>
          <div className="py-2">
            <LanguageSelector />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button variant="outline" asChild className="border-teal-500/20 hover:bg-teal-500/10">
              <Link href="/login" onClick={() => setOpen(false)}>
                Log In
              </Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
            >
              <Link href="/signup" onClick={() => setOpen(false)}>
                Sign Up
              </Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
