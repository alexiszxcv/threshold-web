"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/BackButton"

export default function SoundscapePage() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-600 via-orange-700 to-amber-800 flex items-center justify-center p-8">
      <BackButton />
      <div className="text-center text-white">
        <div className="mb-12">
          <div className="w-64 h-64 bg-black/30 rounded-full mx-auto mb-8 flex items-center justify-center relative">
            <div className="w-48 h-48 bg-black/50 rounded-full flex items-center justify-center relative">
              <div className="w-32 h-32 bg-black/70 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white/60 rounded-full"></div>
              </div>
              {isPlaying && <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-spin"></div>}
            </div>
            <div className="absolute top-8 right-12 w-16 h-1 bg-white/40 rounded-full origin-left rotate-45"></div>
          </div>
        </div>

        <h2 className="text-4xl font-light mb-4">soundscape</h2>

        <div className="flex gap-8 justify-center mb-8">
          <Button
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10 text-lg"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "pause" : "play"}
          </Button>
          <Button
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10 text-lg"
            onClick={() => setIsPlaying(false)}
          >
            stop
          </Button>
        </div>

        <p className="text-white/70 italic text-lg">{isPlaying ? "listening..." : "thank you for listening"}</p>
      </div>
    </div>
  )
}
