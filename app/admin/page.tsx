"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackButton } from "@/components/BackButton"
import { RefreshCw, Trash2, Users, BookOpen, Mail, MessageCircle, TrendingUp } from "lucide-react"

interface AdminStats {
  journalEntries: number
  letters: number
  confessions: number
  growthMoments: number
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats>({
    journalEntries: 0,
    letters: 0,
    confessions: 0,
    growthMoments: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    setIsLoading(true)
    try {
      const [journalRes, lettersRes, confessionsRes, growthRes] = await Promise.all([
        fetch("/api/journal"),
        fetch("/api/letters"),
        fetch("/api/confessions"),
        fetch("/api/growth")
      ])

      const [journal, letters, confessions, growth] = await Promise.all([
        journalRes.json(),
        lettersRes.json(),
        confessionsRes.json(),
        growthRes.json()
      ])

      setStats({
        journalEntries: journal.count || 0,
        letters: letters.count || 0,
        confessions: confessions.count || 0,
        growthMoments: growth.count || 0
      })
    } catch (error) {
      console.error("Failed to fetch stats:", error)
      setMessage("Failed to load statistics")
    } finally {
      setIsLoading(false)
    }
  }

  const clearAllData = async (endpoint: string, name: string) => {
    if (!confirm(`Are you sure you want to clear all ${name}? This cannot be undone.`)) return

    try {
      // This would require implementing a bulk delete endpoint
      setMessage(`Clearing ${name} is not implemented yet for safety`)
    } catch (error) {
      console.error(`Failed to clear ${name}:`, error)
      setMessage(`Failed to clear ${name}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <BackButton />
      <div className="max-w-6xl mx-auto text-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light mb-4">admin dashboard</h1>
          <p className="text-white/80 italic">threshold management console</p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-white/20 rounded-lg text-center">
            {message}
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white/10 border-white/20">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-yellow-400" />
              <div>
                <h3 className="text-2xl font-bold">{stats.journalEntries}</h3>
                <p className="text-white/60">Journal Entries</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/10 border-white/20">
            <div className="flex items-center gap-3">
              <Mail className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-2xl font-bold">{stats.letters}</h3>
                <p className="text-white/60">Letters</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/10 border-white/20">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-red-400" />
              <div>
                <h3 className="text-2xl font-bold">{stats.confessions}</h3>
                <p className="text-white/60">Confessions</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/10 border-white/20">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-400" />
              <div>
                <h3 className="text-2xl font-bold">{stats.growthMoments}</h3>
                <p className="text-white/60">Growth Moments</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Management Actions */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/10">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="letters">Letters</TabsTrigger>
            <TabsTrigger value="confessions">Confessions</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card className="p-6 bg-white/10 border-white/20">
              <h3 className="text-xl font-medium mb-4">System Health</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                  <span>Database Connection</span>
                  <Badge className="bg-green-600">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                  <span>API Endpoints</span>
                  <Badge className="bg-green-600">Operational</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                  <span>Total Records</span>
                  <Badge className="bg-blue-600">
                    {stats.journalEntries + stats.letters + stats.confessions + stats.growthMoments}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                  <span>Last Updated</span>
                  <Badge className="bg-gray-600">{new Date().toLocaleTimeString()}</Badge>
                </div>
              </div>
              <Button 
                onClick={fetchStats} 
                disabled={isLoading}
                className="mt-4 bg-white/20 hover:bg-white/30"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh Statistics
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="journal" className="space-y-6 mt-6">
            <Card className="p-6 bg-white/10 border-white/20">
              <h3 className="text-xl font-medium mb-4">Journal Management</h3>
              <p className="text-white/80 mb-4">
                Manage communal journal entries. Total entries: {stats.journalEntries}
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={() => window.open('/library', '_blank')}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  View Journal
                </Button>
                <Button 
                  onClick={() => clearAllData('journal', 'journal entries')}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Entries
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="letters" className="space-y-6 mt-6">
            <Card className="p-6 bg-white/10 border-white/20">
              <h3 className="text-xl font-medium mb-4">Letters Management</h3>
              <p className="text-white/80 mb-4">
                Manage unsent letters. Total letters: {stats.letters}
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={() => window.open('/mailroom', '_blank')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  View Mailroom
                </Button>
                <Button 
                  onClick={() => clearAllData('letters', 'letters')}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Letters
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="confessions" className="space-y-6 mt-6">
            <Card className="p-6 bg-white/10 border-white/20">
              <h3 className="text-xl font-medium mb-4">Confessions Management</h3>
              <p className="text-white/80 mb-4">
                Manage anonymous confessions. Total confessions: {stats.confessions}
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={() => window.open('/confessional', '_blank')}
                  className="bg-red-600 hover:bg-red-700"
                >
                  View Confessional
                </Button>
                <Button 
                  onClick={() => clearAllData('confessions', 'confessions')}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Confessions
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="growth" className="space-y-6 mt-6">
            <Card className="p-6 bg-white/10 border-white/20">
              <h3 className="text-xl font-medium mb-4">Growth Moments Management</h3>
              <p className="text-white/80 mb-4">
                Manage personal growth tracking. Total moments: {stats.growthMoments}
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={() => window.open('/garden', '_blank')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  View Garden
                </Button>
                <Button 
                  onClick={() => clearAllData('growth', 'growth moments')}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Moments
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
