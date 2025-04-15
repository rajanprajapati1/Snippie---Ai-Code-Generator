"use client";
import { useEffect, useState } from "react"
export default function CodeBlock({ code ,onChange }) {
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
    <div className="h-full overflow-auto bg-white p-4">
      {/* <pre className="text-sm font-mono">{code}</pre> */}
      <textarea
        value={value}
        onChange={handleChange}
        className="flex-1 p-4 font-mono text-sm resize-none outline-none w-full h-full"
        spellCheck="false"
      />
    </div>
  )
}
