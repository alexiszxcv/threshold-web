"use client"

import { useState, useEffect } from "react"
import { journalAPI } from "@/lib/api"
import type { JournalEntry } from "@/types/api"
import { toast } from "@/components/ui/toast"

export const useJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEntries = async (page = 1, limit = 10) => {
    setLoading(true)
    setError(null)

    try {
      const response = await journalAPI.getEntries(page, limit)
      setEntries(response.data.entries)
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to fetch journal entries"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const createEntry = async (content: string, mood?: string) => {
    setLoading(true)

    try {
      const response = await journalAPI.createEntry({
        content,
        mood,
        timestamp: new Date().toLocaleString(),
      })

      toast.success(response.data.message)
      await fetchEntries() // Refresh entries
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to create journal entry"
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  return {
    entries,
    loading,
    error,
    fetchEntries,
    createEntry,
  }
}
