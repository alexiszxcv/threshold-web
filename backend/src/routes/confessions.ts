import express from "express"
import Joi from "joi"
import Confession from "../models/Confession"
import { validateRequest } from "../middleware/validation"

const router = express.Router()

const createConfessionSchema = Joi.object({
  duration: Joi.number().required().min(0).max(300),
  sessionId: Joi.string().optional(),
})

// POST /api/confessions - Record a confession session
router.post("/", validateRequest(createConfessionSchema), async (req, res) => {
  try {
    const confessionData = {
      ...req.body,
      timestamp: new Date().toISOString(),
    }

    const confession = new Confession(confessionData)
    await confession.save()

    res.status(201).json({
      success: true,
      message: "Your voice has been heard and released",
      session: {
        id: confession._id,
        duration: confession.duration,
        timestamp: confession.timestamp,
      },
    })
  } catch (error) {
    console.error("Error recording confession:", error)
    res.status(500).json({ error: "Failed to record confession" })
  }
})

// GET /api/confessions/stats - Get confession statistics
router.get("/stats", async (req, res) => {
  try {
    const totalConfessions = await Confession.countDocuments()
    const totalDuration = await Confession.aggregate([{ $group: { _id: null, totalMinutes: { $sum: "$duration" } } }])

    const avgDuration = totalConfessions > 0 ? Math.round((totalDuration[0]?.totalMinutes || 0) / totalConfessions) : 0

    res.json({
      totalSessions: totalConfessions,
      totalMinutesListened: Math.round((totalDuration[0]?.totalMinutes || 0) / 60),
      averageSessionLength: avgDuration,
      message: "Voices have been heard in this sacred space",
    })
  } catch (error) {
    console.error("Error fetching confession stats:", error)
    res.status(500).json({ error: "Failed to fetch confession statistics" })
  }
})

export default router
