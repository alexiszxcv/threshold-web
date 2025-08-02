"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/BackButton"

export default function MailroomPage() {
  const [letterContent, setLetterContent] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")

  const saveLetter = async () => {
    if (!letterContent.trim()) return

    setIsSaving(true)
    try {
      const response = await fetch("/api/letters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: letterContent,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setMessage("Your letter has been written and safely stored")
        setLetterContent("")
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-800 via-yellow-900 to-amber-900 flex items-center justify-center p-8">
      <BackButton />
      <div className="max-w-2xl w-full text-white">
        <div className="mb-12">
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto mb-8">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-yellow-200/20 rounded-lg p-2 text-xs text-white/60 flex items-center justify-center"
              >
                <div className="w-full h-full bg-white/10 rounded"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="w-4 h-16 bg-orange-300/40 rounded-full relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-orange-400/60 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-light mb-4">mail room</h2>
          <p className="text-white/80 italic text-lg">write a letter you'll never send</p>
        </div>

        <Card className="bg-white/10 border-white/20 p-6 mb-4">
          <textarea
            value={letterContent}
            onChange={(e) => setLetterContent(e.target.value)}
            placeholder="Dear..."
            className="w-full h-64 bg-transparent border-none text-white placeholder-white/50 resize-none focus:outline-none text-lg leading-relaxed"
            style={{ fontFamily: "serif" }}
          />
        </Card>

        <div className="flex justify-between items-center">
          <p className="text-white/60 text-sm">This letter will be stored but never sent</p>
          <Button
            onClick={saveLetter}
            disabled={isSaving || !letterContent.trim()}
            className="bg-white/20 border border-white/30 text-white hover:bg-white/30"
          >
            {isSaving ? "Saving..." : "Save Letter"}
          </Button>
        </div>

        {message && <p className="text-center text-white/80 mt-4 italic">{message}</p>}
      </div>
    </div>
  )
}
