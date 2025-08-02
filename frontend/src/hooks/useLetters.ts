"use client"

import { useState } from "react"
import { letterAPI } from "@/lib/api"
import { toast } from "@/components/ui/toast"

export const useLetters = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const saveLetter = async (content: string, recipient?: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await letterAPI.saveLetter({ content, recipient })
      toast.success(response.data.message)
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to save letter"
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getStats = async () => {
    try {
      const response = await letterAPI.getStats()
      return response.data
    } catch (err: any) {
      console.error("Failed to fetch letter stats:", err)
      return null
    }
  }

  return {
    loading,
    error,
    saveLetter,
    getStats,
  }
}
