export interface JournalEntry {
  _id?: string
  content: string
  timestamp: string
  mood?: string
  isAnonymous: boolean
  underlines: number
  marginNotes: number
  createdAt: Date
  updatedAt: Date
}

export interface Letter {
  _id?: string
  content: string
  recipient?: string
  createdAt: Date
  isUnsent: boolean
}

export interface Confession {
  _id?: string
  duration: number
  timestamp: string
  createdAt: Date
}

export interface GrowthMoment {
  _id?: string
  reflection: string
  intention?: string
  createdAt: Date
}
