import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { LanguageSelector } from "@/components/language-selector"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 opacity-75 blur"></div>
              <div className="relative">
                <Image
                  src="/flowing-forms.png"
                  alt="SmartFeedBacker Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            </div>
            <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
              SmartFeedBacker
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
              How It Works
            </Link>
            <LanguageSelector />
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild className="border-teal-500/20 hover:bg-teal-500/10">
                <Link href="/login">Log In</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col space-y-4 text-left">
                <div className="inline-block rounded-lg bg-teal-500/10 px-3 py-1 text-sm text-teal-500">
                  Real-Time Hotel Feedback System
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                    Fix Issues Before Guests Check Out
                  </h1>
                  <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Hotels often don't know about guest problems until after they leave — when it's too late and they've
                    already written a bad review online.
                  </p>
                  <p className="max-w-[700px] text-gray-700 md:text-xl font-medium dark:text-gray-300">
                    SmartFeedBacker is a real-time, AI-powered feedback system that helps hotels collect feedback
                    instantly, analyze sentimRent, and notify staff immediately when something's wrong.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 px-8">
                    Get Started
                  </Button>
                  <Button variant="outline" className="border-teal-500/20 hover:bg-teal-500/10">
                    Book a Demo
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-500 opacity-30 blur-xl"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/hotel-feedback-dashboard.png"
                    alt="Hotel feedback dashboard showing real-time guest sentiment"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with fancy cards */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-5xl flex-col items-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-teal-500/10 px-3 py-1 text-sm text-teal-500">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                How SmartFeedBacker Works
              </h2>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Taking action before guests leave = better satisfaction and fewer negative reviews.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              {[
                {
                  title: "Guest Feedback Form",
                  description:
                    "Mobile/web form for guests to rate and write comments. Accessed by QR code in rooms, restaurants, and other hotel areas.",
                  icon: "📝",
                },
                {
                  title: "AI Sentiment Detection",
                  description:
                    "Analyzes guest feedback to find the mood (positive or negative) and tags the issue (e.g., Wi-Fi, cleanliness, service).",
                  icon: "🧠",
                },
                {
                  title: "Real-Time Alerts",
                  description:
                    "Sends alerts to hotel staff (via Telegram, email, or dashboard) to help them fix problems right away.",
                  icon: "⚡",
                },
                {
                  title: "Staff Dashboard",
                  description: "Shows all feedback in real time. Staff can mark issues as solved or follow-up needed.",
                  icon: "📊",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <div className="relative z-10">
                    <div className="mb-3 text-3xl">{feature.icon}</div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-5xl flex-col items-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-teal-500/10 px-3 py-1 text-sm text-teal-500">The Process</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                From Feedback to Resolution
              </h2>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                See how SmartFeedBacker transforms guest complaints into opportunities for exceptional service.
              </p>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <div className="relative">
                <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-teal-500 to-blue-500"></div>
                {[
                  {
                    title: "Guest Submits Feedback",
                    description:
                      "Guest scans QR code in their room and submits feedback about a problem with the air conditioning.",
                    icon: "📱",
                  },
                  {
                    title: "AI Analyzes the Message",
                    description:
                      "Our AI instantly detects negative sentiment and categorizes the issue as 'Room Comfort/HVAC'.",
                    icon: "🤖",
                  },
                  {
                    title: "Staff Receives Alert",
                    description:
                      "Maintenance staff receives an immediate notification with room number and issue details.",
                    icon: "🔔",
                  },
                  {
                    title: "Problem Resolution",
                    description:
                      "Staff fixes the issue and marks it as resolved in the system, then follows up with the guest.",
                    icon: "✅",
                  },
                  {
                    title: "Happy Guest, Better Reviews",
                    description:
                      "Guest is impressed with the quick response and leaves a positive review instead of a negative one.",
                    icon: "⭐",
                  },
                ].map((step, index) => (
                  <div key={index} className="relative mb-12 flex items-start">
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/3 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background ${index % 2 === 0 ? "bg-teal-500" : "bg-blue-500"} text-white`}
                    >
                      <span className="text-xl">{step.icon}</span>
                    </div>
                    <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 ml-auto"}`}>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="mt-2 text-gray-500 dark:text-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bonus Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-5xl flex-col items-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-teal-500/10 px-3 py-1 text-sm text-teal-500">
                Bonus Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                Going Beyond Basic Feedback
              </h2>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Additional tools to help your hotel deliver exceptional service.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              {[
                {
                  title: "AI-Suggested Replies",
                  description:
                    "Provides staff with appropriate response templates based on the type of feedback received.",
                  icon: "💬",
                },
                {
                  title: "Weekly Insight Reports",
                  description: "Automatically generated reports that show top guest issues and satisfaction trends.",
                  icon: "📈",
                },
                {
                  title: "Guest Service Chatbot",
                  description: "AI-powered chatbot that can handle common guest requests and questions 24/7.",
                  icon: "🤖",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <div className="relative z-10">
                    <div className="mb-3 text-3xl">{feature.icon}</div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-5xl flex-col items-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-teal-500/10 px-3 py-1 text-sm text-teal-500">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                What Hotel Managers Say
              </h2>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Hear from hotels that have transformed their guest experience with SmartFeedBacker.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              {[
                {
                  quote:
                    "Our online review scores improved by 22% in just three months after implementing SmartFeedBacker.",
                  author: "Maria Rodriguez",
                  role: "General Manager, Seaside Resort & Spa",
                },
                {
                  quote:
                    "The real-time alerts have been a game-changer. We now resolve 87% of guest issues before checkout.",
                  author: "James Chen",
                  role: "Operations Director, Metropolitan Hotel Group",
                },
                {
                  quote:
                    "The weekly reports helped us identify recurring issues with our breakfast service that we never knew existed.",
                  author: "Sarah Johnson",
                  role: "Guest Relations Manager, Alpine Lodge",
                },
              ].map((testimonial, index) => (
                <div key={index} className="relative overflow-hidden rounded-xl border bg-background p-6 shadow-md">
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-teal-500 to-blue-500"></div>
                  <div className="mb-4 text-4xl">"</div>
                  <p className="mb-4 text-gray-500 dark:text-gray-400">{testimonial.quote}</p>
                  <div className="mt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 bg-background">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/flowing-forms.png"
              alt="SmartFeedBacker Logo"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent font-semibold">
              SmartFeedBacker
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} SmartFeedBacker, Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
