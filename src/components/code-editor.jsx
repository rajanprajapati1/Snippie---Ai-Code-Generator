"use client"
import { useState, useEffect } from "react"

export default function CodeEditor({ code, onChange }) {
  const [value, setValue] = useState(code)

  useEffect(() => {
    setValue(code)
  }, [code])

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-100 p-2 text-sm font-mono border-b">HTML</div>
      <textarea
        value={value}
        onChange={handleChange}
        className="flex-1 p-4 font-mono text-sm resize-none outline-none w-full h-full"
        spellCheck="false"
      />
    </div>
  )
}
