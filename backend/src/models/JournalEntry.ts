import mongoose, { type Document, Schema } from "mongoose"

export interface IJournalEntry extends Document {
  content: string
  timestamp: string
  mood?: string
  isAnonymous: boolean
  underlines: number
  marginNotes: number
  createdAt: Date
  updatedAt: Date
}

const JournalEntrySchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 2000,
      trim: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      enum: ["peaceful", "anxious", "hopeful", "melancholy", "grateful", "confused", "angry", "content"],
      default: null,
    },
    isAnonymous: {
      type: Boolean,
      default: true,
    },
    underlines: {
      type: Number,
      default: 0,
      min: 0,
    },
    marginNotes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Index for efficient querying
JournalEntrySchema.index({ createdAt: -1 })
JournalEntrySchema.index({ mood: 1 })

export default mongoose.model<IJournalEntry>("JournalEntry", JournalEntrySchema)
