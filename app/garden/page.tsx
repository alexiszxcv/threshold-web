"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BackButton } from "@/components/BackButton"

export default function GardenPage() {
  const [reflection, setReflection] = useState("")
  const [intention, setIntention] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")

  const plantSeed = async () => {
    if (!reflection.trim()) return

    setIsSaving(true)
    try {
      const response = await fetch("/api/growth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reflection,
          intention,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setMessage("Your seed of intention has been planted")
        setReflection("")
        setIntention("")
      }
    } catch (error) {
      setMessage("The garden is patient. Try again when you're ready.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-amber-800 to-amber-900 flex items-center justify-center p-8">
      <BackButton />
      <div className="max-w-2xl w-full text-white">
        <div className="text-center mb-12">
          <div className="relative w-48 h-32 mx-auto mb-8">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="w-24 h-16 bg-amber-700/40 rounded-full"></div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="w-6 h-12 bg-green-400/60 rounded-full"></div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-green-300/40 rounded-full"></div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-green-400/20 rounded-full blur-md animate-pulse"></div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-light mb-8">the garden</h2>

          <div className="space-y-6 mb-12">
            <p className="text-2xl font-light text-white/90">you don't have to rush.</p>
            <p className="text-2xl font-light text-white/90">you're still growing too.</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-white/10 border-white/20 p-6">
            <label className="block text-white/80 mb-2 text-sm">What growth have you noticed in yourself?</label>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="I've been learning to..."
              className="w-full h-24 bg-transparent border border-white/20 rounded-lg p-4 text-white placeholder-white/50 resize-none focus:outline-none focus:border-white/40"
            />
          </Card>

          <Card className="bg-white/10 border-white/20 p-6">
            <label className="block text-white/80 mb-2 text-sm">What intention would you like to plant?</label>
            <textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="I want to cultivate..."
              className="w-full h-24 bg-transparent border border-white/20 rounded-lg p-4 text-white placeholder-white/50 resize-none focus:outline-none focus:border-white/40"
            />
          </Card>

          <div className="text-center">
            <Button
              onClick={plantSeed}
              disabled={isSaving || !reflection.trim()}
              size="lg"
              className="bg-white/20 border border-white/30 text-white hover:bg-white/30 px-8 py-4"
            >
              {isSaving ? "Planting..." : "Plant Seed of Intention"}
            </Button>
          </div>

          {message && <p className="text-center text-white/80 mt-4 italic">{message}</p>}
        </div>
      </div>
    </div>
  )
}
