import mongoose, { type Document, Schema } from "mongoose"

export interface IGrowthMoment extends Document {
  reflection: string
  intention?: string
  createdAt: Date
  category?: string
}

const GrowthMomentSchema: Schema = new Schema(
  {
    reflection: {
      type: String,
      required: true,
      maxlength: 1000,
      trim: true,
    },
    intention: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    category: {
      type: String,
      enum: ["self-compassion", "relationships", "mindfulness", "creativity", "healing", "growth"],
      default: "growth",
    },
  },
  {
    timestamps: true,
  },
)

GrowthMomentSchema.index({ createdAt: -1 })
GrowthMomentSchema.index({ category: 1 })

export default mongoose.model<IGrowthMoment>("GrowthMoment", GrowthMomentSchema)
