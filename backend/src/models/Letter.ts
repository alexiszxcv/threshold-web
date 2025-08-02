import mongoose, { type Document, Schema } from "mongoose"

export interface ILetter extends Document {
  content: string
  recipient?: string
  createdAt: Date
  isUnsent: boolean
  wordCount: number
}

const LetterSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 5000,
      trim: true,
    },
    recipient: {
      type: String,
      maxlength: 200,
      trim: true,
    },
    isUnsent: {
      type: Boolean,
      default: true,
    },
    wordCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Pre-save middleware to calculate word count
LetterSchema.pre("save", function (next) {
  if (this.content) {
    this.wordCount = this.content.split(/\s+/).filter((word) => word.length > 0).length
  }
  next()
})

LetterSchema.index({ createdAt: -1 })

export default mongoose.model<ILetter>("Letter", LetterSchema)
