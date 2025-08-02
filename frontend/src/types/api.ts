export interface JournalEntry {
  _id: string
  content: string
  timestamp: string
  mood?: string
  isAnonymous: boolean
  underlines: number
  marginNotes: number
  createdAt: string
  updatedAt: string
}

export interface Letter {
  _id: string
  content: string
  recipient?: string
  createdAt: string
  isUnsent: boolean
  wordCount: number
}

export interface Confession {
  _id: string
  duration: number
  timestamp: string
  createdAt: string
  sessionId?: string
}

export interface GrowthMoment {
  _id: string
  reflection: string
  intention?: string
  createdAt: string
  category?: string
}

export interface APIResponse<T> {
  success: boolean
  message: string
  data?: T
}

export interface PaginatedResponse<T> {
  entries: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}
