import mongoose, { type Document, Schema } from "mongoose"

export interface IConfession extends Document {
  duration: number
  timestamp: string
  createdAt: Date
  sessionId?: string
}

const ConfessionSchema: Schema = new Schema(
  {
    duration: {
      type: Number,
      required: true,
      min: 0,
      max: 300, // 5 minutes max
    },
    timestamp: {
      type: String,
      required: true,
    },
    sessionId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

ConfessionSchema.index({ createdAt: -1 })

export default mongoose.model<IConfession>("Confession", ConfessionSchema)
