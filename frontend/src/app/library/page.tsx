"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/BackButton"
import { useJournal } from "@/hooks/useJournal"

export default function LibraryPage() {
  const [journalEntry, setJournalEntry] = useState("")
  const [selectedMood, setSelectedMood] = useState<string>("")
  const { entries, loading, createEntry } = useJournal()

  const moods = ["peaceful", "anxious", "hopeful", "melancholy", "grateful", "confused", "angry", "content"]

  const handleSubmit = async () => {
    if (!journalEntry.trim()) return

    try {
      await createEntry(journalEntry, selectedMood || undefined)
      setJournalEntry("")
      setSelectedMood("")
    } catch (error) {
      // Error is handled by the hook
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
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-white/50">{entry.timestamp}</div>
                  {entry.mood && (
                    <div className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">{entry.mood}</div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Mood selector */}
        <div className="mb-4">
          <p className="text-white/80 text-sm mb-2">How are you feeling? (optional)</p>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <Button
                key={mood}
                variant={selectedMood === mood ? "default" : "outline"}
                size="sm"
                className={`text-xs ${
                  selectedMood === mood
                    ? "bg-white/30 text-white"
                    : "bg-white/10 border-white/30 text-white/80 hover:bg-white/20"
                }`}
                onClick={() => setSelectedMood(selectedMood === mood ? "" : mood)}
              >
                {mood}
              </Button>
            ))}
          </div>
        </div>

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
            onClick={handleSubmit}
            disabled={loading || !journalEntry.trim()}
            className="bg-white/20 border border-white/30 text-white hover:bg-white/30"
          >
            {loading ? "Sharing..." : "Share"}
          </Button>
        </div>
      </div>
    </div>
  )
}
