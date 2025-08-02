import express from "express"
import Joi from "joi"
import GrowthMoment from "../models/GrowthMoment"
import { validateRequest } from "../middleware/validation"

const router = express.Router()

const createGrowthMomentSchema = Joi.object({
  reflection: Joi.string().required().max(1000).trim(),
  intention: Joi.string().optional().max(500).trim(),
  category: Joi.string()
    .valid("self-compassion", "relationships", "mindfulness", "creativity", "healing", "growth")
    .optional(),
})

// POST /api/growth - Record a growth moment
router.post("/", validateRequest(createGrowthMomentSchema), async (req, res) => {
  try {
    const growthMoment = new GrowthMoment(req.body)
    await growthMoment.save()

    res.status(201).json({
      success: true,
      message: "Your growth has been acknowledged",
      moment: {
        id: growthMoment._id,
        reflection: growthMoment.reflection,
        intention: growthMoment.intention,
        category: growthMoment.category,
        createdAt: growthMoment.createdAt,
      },
    })
  } catch (error) {
    console.error("Error saving growth moment:", error)
    res.status(500).json({ error: "Failed to save growth moment" })
  }
})

// GET /api/growth/recent - Get recent growth moments
router.get("/recent", async (req, res) => {
  try {
    const limit = Number.parseInt(req.query.limit as string) || 5

    const moments = await GrowthMoment.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("reflection intention category createdAt -_id")

    res.json({
      moments,
      message: "Recent seeds of growth planted in the garden",
    })
  } catch (error) {
    console.error("Error fetching growth moments:", error)
    res.status(500).json({ error: "Failed to fetch growth moments" })
  }
})

// GET /api/growth/stats - Get growth statistics
router.get("/stats", async (req, res) => {
  try {
    const totalMoments = await GrowthMoment.countDocuments()
    const categoryStats = await GrowthMoment.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    res.json({
      totalGrowthMoments: totalMoments,
      categoryDistribution: categoryStats,
      message: "Seeds of intention planted and growing",
    })
  } catch (error) {
    console.error("Error fetching growth stats:", error)
    res.status(500).json({ error: "Failed to fetch growth statistics" })
  }
})

export default router
