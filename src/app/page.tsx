"use client"

import { useState } from "react"
import rgbToHsl from "@/app/lib/hslConverter"

export default function Home() {
  const [red, setRed] = useState<number>(50)
  const [green, setGreen] = useState<number>(50)
  const [blue, setBlue] = useState<number>(50)
  const [hex, setHex] = useState<string>("")
  const [rgb, setRgb] = useState<string>("")
  const [hsl, setHsl] = useState<string>("")
  const [copiedMessage, setCopiedMessage] = useState<string>("")

  const handleClick = () => {
    const randomRed = Math.floor(Math.random() * 256)
    const randomGreen = Math.floor(Math.random() * 256)
    const randomBlue = Math.floor(Math.random() * 256)
    setRed(randomRed)
    setGreen(randomGreen)
    setBlue(randomBlue)
    setHex(`#${randomRed.toString(16).padStart(2, "0")}${randomGreen.toString(16).padStart(2, "0")}${randomBlue.toString(16).padStart(2, "0")}`)
    setRgb(`rgb(${randomRed},${randomGreen},${randomBlue})`)
    setHsl(rgbToHsl(randomRed, randomGreen, randomBlue))
  }

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMessage(`${format} copied!`)
      setTimeout(() => setCopiedMessage(""), 2000)
    } catch (err) {
      setCopiedMessage("Failed to copy")
      setTimeout(() => setCopiedMessage(""), 2000)
      console.error("Failed to copy: ", err)
    }
  }

  const hexValue = `#${red.toString(16).padStart(2, "0")}${green.toString(16).padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`
  const rgbValue = `rgb(${red},${green},${blue})`
  const hslValue = rgbToHsl(red, green, blue)

  return (
    <main
      className="flex flex-col transition-all duration-800 items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: rgbValue }}
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-2 drop-shadow-lg">Random Color Picker</h1>
        <p className="text-lg text-black/80 font-medium">Generate beautiful random colors with a single click</p>
      </div>

      <button
        onClick={handleClick}
        className="hover:bg-black/40 hover:border-black border-3 border-transparent font-bold hover:rotate-2 transition-all duration-300 hover:text-black mt-4 px-8 py-3 rounded-xl bg-black text-white text-lg shadow-lg hover:shadow-xl"
      >
        Generate Color
      </button>

      {/* Mensaje de copiado */}
      {copiedMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
          {copiedMessage}
        </div>
      )}

      <div className="mt-8 w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-lg">
        <div className="p-6">
          <div className="space-y-4">
            {/* RGB */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700 min-w-[50px]">RGB:</span>
                <code className="bg-gray-200 px-2 py-1 rounded text-sm text-black font-mono">{rgbValue}</code>
              </div>
              <button
                onClick={() => copyToClipboard(rgbValue, "RGB")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded text-sm transition-colors duration-200 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </button>
            </div>

            {/* HEX */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700 min-w-[50px]">HEX:</span>
                <code className="bg-gray-200 px-2 py-1 rounded text-sm text-black font-mono">{hexValue}</code>
              </div>
              <button
                onClick={() => copyToClipboard(hexValue, "HEX")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded text-sm transition-colors duration-200 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </button>
            </div>

            {/* HSL */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700 min-w-[50px]">HSL:</span>
                <code className="bg-gray-200 px-2 py-1 rounded text-sm text-black font-mono">{hslValue}</code>
              </div>
              <button
                onClick={() => copyToClipboard(hslValue, "HSL")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded text-sm transition-colors duration-200 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Color Preview</h3>
            <div
              className="w-full h-20 rounded-lg border-2 border-gray-300 shadow-inner"
              style={{ backgroundColor: rgbValue }}
            ></div>
          </div>
        </div>
      </div>
    </main>
  )
}

