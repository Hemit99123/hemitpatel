"use client"

import { useState, useEffect } from "react"

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer)
          return 100
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 200)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 to-purple-300">
      <div className="text-white text-6xl font-bold mb-8 hover:cursor-pointer">
        <span className="inline-block transform hover:scale-110 transition-transform duration-200" title="Click for more info">H</span>
        <span className="inline-block transform hover:scale-110 transition-transform duration-200" title="Click for more info">e</span>
        <span className="inline-block transform hover:scale-110 transition-transform duration-200" title="Click for more info">m</span>
        <span className="inline-block transform hover:scale-110 transition-transform duration-200" title="Click for more info">i</span>
        <span className="inline-block transform hover:scale-110 transition-transform duration-200" title="Click for more info">t</span>

        <span className="inline-block transform hover:scale-110 transition-transform duration-200">&nbsp;</span>

        <span className="inline-block transform hover:scale-110 transition-transform duration-200" title="Click for more info">P</span>
        <span className="inline-block transform hover:scale-110 transition-transform duration-200" title="Click for more info">a</span>
        <span className="inline-block transform hover:scale-110 transition-transform duration-200" title="Click for more info">t</span>
        <span className="inline-block transform hover:scale-110 transition-transform duration-200" title="Click for more info">e</span>
        <span className="inline-block transform hover:scale-110 transition-transform duration-200" title="Click for more info">l</span>
      </div>
      <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-4 text-white text-lg font-semibold">Loading your experience...</p>
      <p className="mt-2 text-white text-md">Click on the models to see extra information!</p>
    </div>
  )
}
