import express from "express"
import Joi from "joi"
import Letter from "../models/Letter"
import { validateRequest } from "../middleware/validation"

const router = express.Router()

const createLetterSchema = Joi.object({
  content: Joi.string().required().max(5000).trim(),
  recipient: Joi.string().optional().max(200).trim(),
})

// POST /api/letters - Save an unsent letter
router.post("/", validateRequest(createLetterSchema), async (req, res) => {
  try {
    const letter = new Letter(req.body)
    await letter.save()

    res.status(201).json({
      success: true,
      message: "Letter written and safely stored (unsent)",
      letter: {
        id: letter._id,
        wordCount: letter.wordCount,
        createdAt: letter.createdAt,
      },
    })
  } catch (error) {
    console.error("Error saving letter:", error)
    res.status(500).json({ error: "Failed to save letter" })
  }
})

// GET /api/letters/stats - Get letter statistics
router.get("/stats", async (req, res) => {
  try {
    const totalLetters = await Letter.countDocuments()
    const totalWords = await Letter.aggregate([{ $group: { _id: null, totalWords: { $sum: "$wordCount" } } }])

    const avgWordsPerLetter = totalLetters > 0 ? Math.round((totalWords[0]?.totalWords || 0) / totalLetters) : 0

    res.json({
      totalLetters,
      totalWords: totalWords[0]?.totalWords || 0,
      averageWordsPerLetter: avgWordsPerLetter,
      message: `${totalLetters} letters have been written in this space`,
    })
  } catch (error) {
    console.error("Error fetching letter stats:", error)
    res.status(500).json({ error: "Failed to fetch letter statistics" })
  }
})

export default router
