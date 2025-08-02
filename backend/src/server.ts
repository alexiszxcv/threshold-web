import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import compression from "compression"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"
import { connectDB } from "./config/database"
import journalRoutes from "./routes/journal"
import letterRoutes from "./routes/letters"
import confessionRoutes from "./routes/confessions"
import growthRoutes from "./routes/growth"
import { errorHandler } from "./middleware/errorHandler"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

// Connect to MongoDB Atlas
connectDB()

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'"],
      },
    },
  }),
)
app.use(compression())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
})
app.use(limiter)

// CORS configuration
app.use(
  cors({
    origin: [
      "https://threshold-1054224705034.us-east4.run.app",
      "http://localhost:3000", // For development
    ],
    credentials: true,
  }),
)

// Body parsing middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Logging
app.use(morgan("combined"))

// Health check endpoint for Cloud Run
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "Threshold API",
    url: "https://threshold-1054224705034.us-east4.run.app",
    database: "MongoDB Atlas Connected",
    environment: process.env.NODE_ENV,
  })
})

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "🌟 Threshold - A Living Emotional Habitat",
    frontend: "https://threshold-1054224705034.us-east4.run.app",
    health: "/health",
    api: {
      journal: "/api/journal",
      letters: "/api/letters",
      confessions: "/api/confessions",
      growth: "/api/growth",
    },
    database: "MongoDB Atlas",
    version: "1.0.0",
  })
})

// API routes
app.use("/api/journal", journalRoutes)
app.use("/api/letters", letterRoutes)
app.use("/api/confessions", confessionRoutes)
app.use("/api/growth", growthRoutes)

// Error handling middleware
app.use(errorHandler)

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    availableRoutes: ["/", "/health", "/api/journal", "/api/letters", "/api/confessions", "/api/growth"],
  })
})

app.listen(PORT, () => {
  console.log(`🌟 Threshold API server running on port ${PORT}`)
  console.log(`🔗 Frontend URL: https://threshold-1054224705034.us-east4.run.app`)
  console.log(`🌐 Health check: https://threshold-1054224705034.us-east4.run.app/health`)
  console.log(`🍃 MongoDB Atlas: cluster0.jywh1bn.mongodb.net`)
})

export default app
