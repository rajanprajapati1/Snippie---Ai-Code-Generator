"use client"

import { useState, useRef } from "react"
import { Maximize, Minimize } from "lucide-react"

export default function Preview({ code }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef(null)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div
      ref={containerRef}
      className={`h-full w-full flex flex-col z-50 ${
        isFullscreen ? "fixed top-0 left-0 right-0 bottom-0 bg-white" : ""
      }`}
    >
      <div className="bg-gray-100 p-2 text-sm font-mono border-b flex items-center justify-between">
        <span>Preview</span>
        <button
          onClick={toggleFullscreen}
          className="text-gray-600 hover:text-black transition"
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
      </div>
      <div className="flex-1 overflow-auto bg-white">
        <iframe
          title="preview"
          className="w-full h-full border-0"
          srcDoc={code}
          sandbox="allow-scripts allow-forms allow-modals"
        />
      </div>
    </div>
  )
}
