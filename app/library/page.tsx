"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/BackButton"
import type { JournalEntry } from "@/lib/models/JournalEntry"

export default function LibraryPage() {
  const [journalEntry, setJournalEntry] = useState("")
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/journal")
      const data = await response.json()
      setEntries(data)
    } catch (error) {
      console.error("Failed to fetch entries:", error)
    }
  }

  const saveEntry = async () => {
    if (!journalEntry.trim()) return

    setIsSaving(true)
    try {
      const response = await fetch("/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: journalEntry,
          timestamp: new Date().toLocaleString(),
          isAnonymous: true,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setMessage("Your thoughts have been added to the communal journal")
        setJournalEntry("")
        fetchEntries()
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-700 via-amber-600 to-orange-600 flex items-center justify-center p-8">
      <BackButton />
      <div className="max-w-2xl w-full text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light mb-4">library</h2>
          <p className="text-white/80 italic">communal journal</p>
        </div>

        {/* Featured entry */}
        <Card className="bg-white/15 border-white/20 p-8 mb-8 relative">
          <div className="absolute top-4 right-4 text-xs text-white/50">added at 3:08 a.m. / the sky was lavender</div>

          <div className="mt-8 mb-6">
            <p className="text-2xl italic text-white/90 leading-relaxed" style={{ fontFamily: "serif" }}>
              I miss who I was before I stopped trusting people.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>★ underlined by 54 readers</span>
            <span>📝 3 margin notes</span>
          </div>

          <div className="absolute bottom-4 right-8">
            <div className="w-6 h-6 bg-orange-300/30 rounded-full"></div>
          </div>
        </Card>

        {/* Recent entries */}
        {entries.length > 0 && (
          <div className="mb-6 space-y-4">
            <h3 className="text-lg font-light text-white/80">Recent entries</h3>
            {entries.slice(0, 3).map((entry) => (
              <Card key={entry._id} className="bg-white/10 border-white/20 p-4">
                <p className="text-white/90 italic text-sm leading-relaxed" style={{ fontFamily: "serif" }}>
                  "{entry.content}"
                </p>
                <div className="text-xs text-white/50 mt-2">{entry.timestamp}</div>
              </Card>
            ))}
          </div>
        )}

        {/* New entry form */}
        <Card className="bg-white/10 border-white/20 p-6 mb-4">
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="What's weighing on your heart tonight?"
            className="w-full h-32 bg-transparent border-none text-white placeholder-white/50 resize-none focus:outline-none text-lg"
            style={{ fontFamily: "serif" }}
          />
        </Card>

        <div className="flex justify-between items-center">
          <p className="text-white/60 text-sm">Your entry will be shared anonymously</p>
          <Button
            onClick={saveEntry}
            disabled={isSaving || !journalEntry.trim()}
            className="bg-white/20 border border-white/30 text-white hover:bg-white/30"
          >
            {isSaving ? "Sharing..." : "Share"}
          </Button>
        </div>

        {message && <p className="text-center text-white/80 mt-4 italic">{message}</p>}
      </div>
    </div>
  )
}
