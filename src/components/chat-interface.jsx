"use client"

import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { ArrowLeft, X, RefreshCw, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "@/components/code-block"
import Preview from "./Preview"

export default function ChatInterface({ prompt, onBack }) {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("preview")
    const [projectName, setProjectName] = useState(`v1 ${prompt}`)
    const [code, setCode] = useState('')
    const [input, setInput] = useState('')
    
    // Function to fetch response from API
    const fetchResponse = async (userPrompt) => {
        setLoading(true)
        try {
            const response = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  userPrompt }),
            })
            
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            
            const data = await response.json()
            
            // Add the response to messages
            setMessages(prev => [
                ...prev,
                { role: "assistant", content: data?.data }
            ])
            
            // Extract code if present in the response
            const htmlCodeMatch = data?.data?.match(/```html([\s\S]*?)```/i) ||  data?.data?.match(/<!DOCTYPE html>([\s\S]*?)<\/html>/i)
            
            if (htmlCodeMatch) {
                const extractedCode = htmlCodeMatch[0].startsWith('```') ? 
                    htmlCodeMatch[1].trim() : 
                    htmlCodeMatch[0].trim()
                
                setCode(extractedCode)
            }
            
        } catch (error) {
            console.error('Error fetching AI response:', error)
            setMessages(prev => [
                ...prev,
                { role: "assistant", content: "Sorry, I encountered an error processing your request. Please try again." }
            ])
        } finally {
            setLoading(false)
        }
    }
    
    // Initial load with provided prompt
    useEffect(() => {
        setProjectName(prompt)
        if (prompt) {
            setMessages([{ role: "user", content: prompt }])
            fetchResponse(prompt)
            setProjectName(`v1 ${input || prompt}`)
        }
    }, [prompt ,input])
    
    // Default code example
    useEffect(() => {
        const defaultCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Loading Animation</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes bounceUpDown {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    .animate-bounce-up-down {
      animation: bounceUpDown 1s infinite ease-in-out;
    }
  </style>
</head>
<body class="bg-white flex items-center justify-center min-h-screen">
  <div class="flex space-x-2">
    <div class="w-4 h-4 bg-blue-500 rounded-full animate-bounce-up-down"></div>
    <div class="w-4 h-4 bg-pink-500 rounded-full animate-bounce-up-down [animation-delay:0.2s]"></div>
    <div class="w-4 h-4 bg-purple-500 rounded-full animate-bounce-up-down [animation-delay:0.4s]"></div>
  </div>
</body>
</html>

        `
        setCode(defaultCode)
    }, [])
    
    // Handle follow-up message submission
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!input.trim()) return
        
        const newMessage = { role: "user", content: input }
        setMessages(prev => [...prev, newMessage])
        setInput('')
        
        fetchResponse(input)
    }

    return (
        <div className="flex h-screen">
            {/* Chat Section */}
            <div className="w-1/2 border-r overflow-y-auto flex flex-col">
                <div className="p-4 border-b flex items-center">
                    <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
                        <ArrowLeft size={16} />
                    </Button>
                    <span className="text-lg font-medium">Snippie</span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {messages.length === 0 && loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="flex flex-col items-center">
                                <RefreshCw size={24} className="animate-spin mb-2" />
                                <div>Processing your request...</div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((message, index) => (
                                <div key={index} className={`${message.role === "user" ? "bg-gray-50 p-3 rounded-lg" : ""}`}>
                                    {message.role === "user" ? (
                                        <div className="mb-4">{message.content}</div>
                                    ) : (
                                        <div>
                                            <code>{message.content}</code>

                                            {index === messages.length - 1 && message.role === "assistant" && (
                                                <div className="mt-4 border rounded-md overflow-hidden">
                                                    <div className="bg-gray-100 p-2 flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="bg-gray-200 text-gray-700 w-8 h-8 rounded flex items-center justify-center font-mono">
                                                                V1
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">{projectName}</div>
                                                                <div className="text-xs text-gray-500">index.html</div>
                                                            </div>
                                                        </div>
                                                        <Button variant="ghost" size="sm">
                                                            <svg
                                                                width="15"
                                                                height="15"
                                                                viewBox="0 0 15 15"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M8.5 2H12.5C12.7761 2 13 2.22386 13 2.5V12.5C13 12.7761 12.7761 13 12.5 13H2.5C2.22386 13 2 12.7761 2 12.5V8.5"
                                                                    stroke="currentColor"
                                                                />
                                                                <path d="M7.5 7.5L2.5 12.5" stroke="currentColor" />
                                                                <path d="M2.5 7.5V2.5H7.5" stroke="currentColor" />
                                                            </svg>
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {/* Loading state for follow-up messages */}
                            {loading && messages.length > 0 && (
                                <div className="flex items-center text-gray-500 mt-4">
                                    <RefreshCw size={16} className="animate-spin mr-2" />
                                    <span>Generating response...</span>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Follow-up input area */}
                <div className="p-4 border-t mt-auto">
                    <form onSubmit={handleSubmit} className="flex items-center">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-1"
                            disabled={loading}
                        />
                        <Button 
                            type="submit" 
                            size="sm" 
                            className="ml-2 bg-blue-500 hover:bg-blue-600 rounded-full h-8 w-8 p-0 flex items-center justify-center"
                            disabled={loading}
                        >
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1 7.5H14M14 7.5L8 1.5M14 7.5L8 13.5"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Button>
                    </form>
                </div>
            </div>

            {/* Preview Section */}
            <div className="w-1/2 flex flex-col">
                <div className="border-b p-2 flex items-center justify-between">
                    <div className="flex items-center">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <X size={16} />
                        </Button>
                        <span className="ml-2 text-sm">{projectName}</span>
                    </div>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-9">
                        <TabsList className="h-8">
                            <TabsTrigger value="code" className="h-8 px-3">
                                Code
                            </TabsTrigger>
                            <TabsTrigger value="preview" className="h-8 px-3">
                                Preview
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="flex-1 overflow-hidden relative">
                    {activeTab === "code" ? <CodeBlock onChange={setCode} code={code} /> : <Preview code={code} />}
                </div>
            </div>
        </div>
    )
}