"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="sm"
      className="absolute top-4 left-4 z-50 text-white/80 hover:text-white hover:bg-white/20"
      onClick={() => router.push("/")}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Threshold
    </Button>
  )
}
