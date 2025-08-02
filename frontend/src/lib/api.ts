import axios from "axios"
import { getApiUrl } from "./config"

const API_BASE_URL = getApiUrl()

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error("❌ API Request Error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor with better error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    if (error.code === "ECONNREFUSED") {
      console.error("❌ Backend server is not running. Please start the backend server.")
    } else {
      console.error("❌ API Response Error:", error.response?.data || error.message)
    }
    return Promise.reject(error)
  },
)

// API endpoints
export const journalAPI = {
  getEntries: (page = 1, limit = 10) => api.get(`/api/journal?page=${page}&limit=${limit}`),
  createEntry: (data: { content: string; mood?: string; timestamp?: string }) => api.post("/api/journal", data),
  getStats: () => api.get("/api/journal/stats"),
}

export const letterAPI = {
  saveLetter: (data: { content: string; recipient?: string }) => api.post("/api/letters", data),
  getStats: () => api.get("/api/letters/stats"),
}

export const confessionAPI = {
  recordConfession: (data: { duration: number; sessionId?: string }) => api.post("/api/confessions", data),
  getStats: () => api.get("/api/confessions/stats"),
}

export const growthAPI = {
  saveGrowthMoment: (data: { reflection: string; intention?: string; category?: string }) =>
    api.post("/api/growth", data),
  getRecentMoments: (limit = 5) => api.get(`/api/growth/recent?limit=${limit}`),
  getStats: () => api.get("/api/growth/stats"),
}
