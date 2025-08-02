import mongoose from "mongoose"

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI

    if (!mongoURI) {
      throw new Error("MONGODB_URI environment variable is not defined")
    }

    // MongoDB connection options optimized for Atlas
    const conn = await mongoose.connect(mongoURI, {
      dbName: "threshold",
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // Disable mongoose buffering
    })

    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`)
    console.log(`📊 Database: ${conn.connection.name}`)
  } catch (error) {
    console.error("❌ MongoDB connection error:", error)
    process.exit(1)
  }
}

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log("🔗 Mongoose connected to MongoDB Atlas")
})

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err)
})

mongoose.connection.on("disconnected", () => {
  console.log("🔌 Mongoose disconnected from MongoDB Atlas")
})

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", async () => {
  await mongoose.connection.close()
  console.log("🔌 Mongoose connection closed through app termination")
  process.exit(0)
})

process.on("SIGTERM", async () => {
  await mongoose.connection.close()
  console.log("🔌 Mongoose connection closed through app termination")
  process.exit(0)
})
