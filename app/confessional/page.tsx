"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/BackButton"

export default function ConfessionalPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [message, setMessage] = useState("")

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)

    const interval = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 120) {
          // Auto-stop after 2 minutes
          stopRecording()
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 1000)
  }

  const stopRecording = async () => {
    setIsRecording(false)

    try {
      const response = await fetch("/api/confessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          duration: recordingTime,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setMessage("Your voice has been heard and released into the void")
        setRecordingTime(0)
      }
    } catch (error) {
      setMessage("Something went wrong. Your words are still safe with you.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-yellow-900 to-black flex items-center justify-center p-8">
      <BackButton />
      <div className="text-center text-white">
        <div className="mb-12">
          <div className="w-32 h-24 bg-black/40 rounded-2xl mx-auto mb-4 flex items-center justify-center relative">
            <div className="w-20 h-16 bg-white/10 rounded-xl flex items-center justify-center">
              <div className="w-12 h-8 bg-white/20 rounded-full"></div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-white/20 rounded-full"></div>
          </div>
          <div className="w-24 h-6 bg-black/30 rounded-full mx-auto"></div>
        </div>

        <h2 className="text-3xl font-light mb-4">the confessional</h2>
        <p className="text-white/80 italic text-lg mb-12">leave a message you don't need answered</p>

        {!isRecording ? (
          <div className="space-y-6">
            <Button
              size="lg"
              className="bg-white/20 border border-white/30 text-white hover:bg-white/30 px-8 py-4 text-lg"
              onClick={startRecording}
            >
              Pick up the phone
            </Button>
            <p className="text-white/60 text-sm">Your words will be heard, but never stored</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-full max-w-md mx-auto h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/60 rounded-full transition-all duration-1000"
                style={{ width: `${(recordingTime / 120) * 100}%` }}
              ></div>
            </div>
            <p className="text-white/80">
              Recording... {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}
            </p>
            <p className="text-white/70 text-sm">Speak freely... the line is open</p>
            <Button
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              onClick={stopRecording}
            >
              Hang up
            </Button>
          </div>
        )}

        {message && <p className="text-white/80 mt-6 italic">{message}</p>}
      </div>
    </div>
  )
}
