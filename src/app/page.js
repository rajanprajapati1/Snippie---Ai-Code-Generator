"use client"

import { useState } from "react"
import { ArrowRight, Github, Sparkles, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ChatInterface from "@/components/chat-interface"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [showChat, setShowChat] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (prompt.trim()) {
      setShowChat(true)
    }
  }

  const examplePrompts = [
    "Quiz app",
    "Blog app",
    "Flashcard app",
    "Timezone dashboard",
  ]

  if (showChat) {
    return <ChatInterface prompt={prompt} onBack={() => setShowChat(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center py-6 px-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-pink-500" />
          <span className="font-semibold italic text-lg text-gray-800 flex items-center">
            Snippie</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <span>Made with 💖 by</span>
            <span className="font-semibold">Rajan</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => window.location.href = 'https://github.com/rajanprajapati1'}
              variant="outline" size="sm" className="gap-1.5 cursor-pointer"
            >
              <Github size={16} />
              <span className="text-gray-500">GitHub</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 w-full max-w-6xl flex flex-col items-center justify-center px-4 -mt-20">
        <p className="text-lg sm:text-xl text-center text-gray-500 max-w-xl mb-10">
          Snippie makes building fun & easy. Just tell us your idea ✨
        </p>
        <div className="w-full max-w-3xl">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <Input
                placeholder="Build me a budgeting app..."
                className="border-0 text-3xl focus-visible:ring-0 focus-visible:ring-offset-0"
                value={prompt}
                style={{ fontSize: '1.2rem' }}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <Button type="submit" size="sm" className="bg-pink-500 hover:bg-pink-600 h-10 w-10 p-0">
                  <ArrowRight size={20} />
                </Button>
              </div>
            </div>
          </form>

          {/* Examples */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {examplePrompts.map((example, index) => (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                onClick={() => {
                  setPrompt(example)
                  setShowChat(true)
                }}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      </main>

      <footer className="w-full py-6 flex justify-center gap-4 text-gray-500">
        <a href="https://github.com/rajanprajapati1" target="_blank"><Github size={20} /></a>
      </footer>
    </div>
  )
}
