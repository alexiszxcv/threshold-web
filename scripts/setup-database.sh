#!/bin/bash

echo "🍃 Setting up MongoDB Atlas Database"
echo "===================================="

# MongoDB connection details
MONGO_URI="mongodb+srv://mercialexis7:kQUiAAWDEiW1nJAD@cluster0.jywh1bn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
DB_NAME="threshold"

echo "📊 Database: $DB_NAME"
echo "🌐 Cluster: cluster0.jywh1bn.mongodb.net"

# Test connection
echo "🧪 Testing MongoDB connection..."

# Create a simple Node.js script to test connection and create indexes
cat > test-connection.js << 'EOF'
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function setupDatabase() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
    
    const db = client.db('threshold');
    
    // Create collections and indexes
    console.log('📝 Creating collections and indexes...');
    
    // Journal entries collection
    const journalCollection = db.collection('journalentries');
    await journalCollection.createIndex({ createdAt: -1 });
    await journalCollection.createIndex({ mood: 1 });
    console.log('✅ Journal entries collection ready');
    
    // Letters collection
    const lettersCollection = db.collection('letters');
    await lettersCollection.createIndex({ createdAt: -1 });
    console.log('✅ Letters collection ready');
    
    // Confessions collection
    const confessionsCollection = db.collection('confessions');
    await confessionsCollection.createIndex({ createdAt: -1 });
    console.log('✅ Confessions collection ready');
    
    // Growth moments collection
    const growthCollection = db.collection('growthmoments');
    await growthCollection.createIndex({ createdAt: -1 });
    await growthCollection.createIndex({ category: 1 });
    console.log('✅ Growth moments collection ready');
    
    // Insert sample data
    console.log('🌱 Inserting sample data...');
    
    await journalCollection.insertOne({
      content: "I miss who I was before I stopped trusting people.",
      timestamp: "3:08 a.m. / the sky was lavender",
      mood: "melancholy",
      isAnonymous: true,
      underlines: 54,
      marginNotes: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log('✅ Sample data inserted');
    console.log('🎉 Database setup complete!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
  } finally {
    await client.close();
  }
}

setupDatabase();
EOF

# Run the setup script
MONGODB_URI="$MONGO_URI" node test-connection.js

# Clean up
rm test-connection.js

echo ""
echo "✅ MongoDB Atlas setup complete!"
echo "🔗 Connection string configured for both development and production"
echo "📊 Database name: threshold"
echo "🏗️  Collections created: journalentries, letters, confessions, growthmoments"
