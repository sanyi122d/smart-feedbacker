"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Bot, ChevronDown, Home, LogOut, Menu, MessageSquare, BarChart, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user is admin
    const userRole = localStorage.getItem("userRole")
    setIsAdmin(userRole === "admin")
  }, [])

  // Define navigation items based on user role
  const navItems = isAdmin
    ? [
        { href: "/dashboard", label: "Dashboard", icon: Home },
        { href: "/dashboard/analytics", label: "Analytics", icon: BarChart },
        { href: "/dashboard/users", label: "Users", icon: Users },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
      ]
    : [
        { href: "/dashboard", label: "Dashboard", icon: Home },
        { href: "/dashboard/feedback", label: "Feedback", icon: MessageSquare },
        { href: "/dashboard/chatbot", label: "Concierge", icon: Bot },
      ]

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen flex-col">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-2 md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col p-0">
                  <div className="flex items-center gap-2 border-b p-4">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 opacity-75 blur"></div>
                      <div className="relative">
                        <Image
                          src="/flowing-forms.png"
                          alt="SmartFeedBacker Logo"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
                      {isAdmin ? "Admin Dashboard" : "SmartFeedBacker"}
                    </span>
                  </div>
                  <div className="flex-1 overflow-auto py-2">
                    <nav className="grid gap-1 px-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                            pathname === item.href
                              ? "bg-teal-500/10 text-teal-600 dark:text-teal-400"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                          onClick={() => setOpen(false)}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
              <Link href="/dashboard" className="flex items-center gap-2">
                <Image
                  src="/flowing-forms.png"
                  alt="SmartFeedBacker Logo"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
                  {isAdmin ? "Admin Dashboard" : "SmartFeedBacker"}
                </span>
              </Link>
            </div>

            <div className="hidden md:flex md:flex-1">
              <SidebarTrigger />
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                      {isAdmin ? "A" : "G"}
                    </div>
                    <span className="hidden md:inline-flex">{isAdmin ? "Admin" : "Guest"}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {!isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/feedback" className="flex w-full cursor-pointer">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Feedback
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {!isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/chatbot" className="flex w-full cursor-pointer">
                        <Bot className="mr-2 h-4 w-4" />
                        Concierge Chat
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/" className="flex w-full cursor-pointer text-red-500 hover:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar (Desktop) */}
          <Sidebar className="hidden md:flex">
            <SidebarHeader className="flex h-14 items-center border-b px-4">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Image
                  src="/flowing-forms.png"
                  alt="SmartFeedBacker Logo"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
                  {isAdmin ? "Admin Dashboard" : "SmartFeedBacker"}
                </span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Log out">
                    <Link href="/" className="text-red-500 hover:text-red-600">
                      <LogOut />
                      <span>Log out</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container py-6">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
