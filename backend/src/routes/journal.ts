import express from "express"
import Joi from "joi"
import JournalEntry from "../models/JournalEntry"
import { validateRequest } from "../middleware/validation"

const router = express.Router()

// Validation schemas
const createJournalEntrySchema = Joi.object({
  content: Joi.string().required().max(2000).trim(),
  timestamp: Joi.string().optional(),
  mood: Joi.string()
    .valid("peaceful", "anxious", "hopeful", "melancholy", "grateful", "confused", "angry", "content")
    .optional(),
  isAnonymous: Joi.boolean().default(true),
})

// GET /api/journal - Get recent journal entries
router.get("/", async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const entries = await JournalEntry.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).select("-__v")

    const total = await JournalEntry.countDocuments()

    res.json({
      entries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching journal entries:", error)
    res.status(500).json({ error: "Failed to fetch journal entries" })
  }
})

// POST /api/journal - Create new journal entry
router.post("/", validateRequest(createJournalEntrySchema), async (req, res) => {
  try {
    const entryData = {
      ...req.body,
      timestamp: req.body.timestamp || new Date().toLocaleString(),
    }

    const entry = new JournalEntry(entryData)
    await entry.save()

    res.status(201).json({
      success: true,
      message: "Entry added to the communal journal",
      entry: {
        id: entry._id,
        content: entry.content,
        timestamp: entry.timestamp,
        createdAt: entry.createdAt,
      },
    })
  } catch (error) {
    console.error("Error creating journal entry:", error)
    res.status(500).json({ error: "Failed to create journal entry" })
  }
})

// GET /api/journal/stats - Get journal statistics
router.get("/stats", async (req, res) => {
  try {
    const totalEntries = await JournalEntry.countDocuments()
    const moodStats = await JournalEntry.aggregate([
      { $match: { mood: { $ne: null } } },
      { $group: { _id: "$mood", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    res.json({
      totalEntries,
      moodDistribution: moodStats,
    })
  } catch (error) {
    console.error("Error fetching journal stats:", error)
    res.status(500).json({ error: "Failed to fetch statistics" })
  }
})

export default router
