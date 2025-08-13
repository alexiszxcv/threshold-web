# Threshold 🌙

A contemplative digital sanctuary built with Next.js and MongoDB, designed for reflection, growth, and anonymous sharing in a liminal space between day and night.

<img width="417" height="677" alt="Screenshot 2025-08-02 at 12 18 27 AM" src="https://github.com/user-attachments/assets/2b1b0379-63e6-4232-ba80-bee6af961a47" />

## 🎯 Iteration 2 - CRUD Implementation Complete

This application fully satisfies the Iteration 2 requirements with comprehensive CRUD operations across all core modules.

### ✅ Requirements Met:
- **✅ Full CRUD API** - All modules support Create, Read, Update, Delete
- **✅ MongoDB Integration** - Complete database operations with connection pooling
- **✅ RESTful Endpoints** - Standard HTTP methods (GET, POST, PUT, DELETE)
- **✅ Core Functionality** - Journal, Letters, Confessions, Growth modules
- **✅ Error Handling** - Comprehensive error responses and validation
- **✅ Testing** - CRUD test suite included

## 🌟 Features

### Core Spaces
- **📖 Library** - Journal your thoughts with full CRUD operations
- **🌱 Garden** - Track personal growth moments
- **💌 Mailroom** - Send, edit, and manage anonymous letters
- **🤫 Confessional** - Share and manage anonymous confessions
- **🏛️ Hallway** - Navigate between spaces
- **🎵 Soundscape** - Ambient audio for contemplation

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **MongoDB** - Document database with full CRUD operations
- **TypeScript** - Type-safe development
- **Google Cloud Run** - Containerized deployment

## 🌐 Complete CRUD API

### Journal API (`/api/journal`)
- **GET** `/api/journal` - Fetch all journal entries (paginated)
- **POST** `/api/journal` - Create new journal entry
- **PUT** `/api/journal` - Update existing journal entry
- **DELETE** `/api/journal?id=ObjectId` - Delete journal entry

### Letters API (`/api/letters`)
- **GET** `/api/letters` - Fetch letters (count or full content)
- **POST** `/api/letters` - Send new letter
- **PUT** `/api/letters` - Update letter or mark as sent
- **DELETE** `/api/letters?id=ObjectId` - Delete letter

### Confessions API (`/api/confessions`)
- **GET** `/api/confessions` - Fetch all confessions
- **POST** `/api/confessions` - Submit new confession
- **PUT** `/api/confessions` - Update confession metadata
- **DELETE** `/api/confessions?id=ObjectId` - Delete confession

### Growth API (`/api/growth`)
- **GET** `/api/growth` - Fetch growth moments
- **POST** `/api/growth` - Record new growth moment
- **PUT** `/api/growth` - Update growth moment
- **DELETE** `/api/growth?id=ObjectId` - Delete growth moment

can u add this to the repo github read me:

## Iteration 3 

### 1. Admin Dashboard (/admin)
- Real-time Statistics: Live counts for all content types across modules
- System Health Monitoring: Database connectivity and API status checks
- Tabbed Interface: Organized management for Journal, Letters, Confessions, and Growth
- Content Management: Direct links to view each room/module
- Production-Ready: Error handling and loading states

### 2. Global Error Handling
- Error Boundary Component: Catches and displays user-friendly error messages
- Development vs Production: Shows error details in dev, clean messages in production
- Recovery Options: "Try Again" and "Return Home" functionality
- Graceful Degradation: Application continues working even with partial failures

### 3. Performance Monitoring
- Real-Time Metrics: Page load time, API response time, memory usage
- Visual Indicators: Color-coded performance badges (green/yellow/red)
- Developer Tools: Ctrl+Shift+P to toggle monitoring display
- Database Insights: Connection time estimation and health checks

### 4. Enhanced User Experience
- Subtle Admin Access: Clean admin link on main page
- Comprehensive Documentation: Complete technical and project documentation
- Production Optimization: Error handling, loading states, user feedback

### 5. Complete Project Documentation
- Technical Architecture: Full-stack overview and implementation details
- API Documentation: Complete endpoint reference with examples
- Database Schema: Detailed collection structures and relationships
- Deployment Guide: Local development and production deployment instructions


## 🗄️ Database Implementation

### MongoDB Collections & Operations

#### Collections:
- `journal_entries` - User reflections and thoughts
- `letters` - Anonymous letters with send/unsend functionality
- `confessions` - Timed anonymous confessions
- `growth_moments` - Personal development tracking

#### MongoDB Queries Utilized:
- **Find Operations**: `collection.find({}).sort().limit()`
- **Insert Operations**: `collection.insertOne(document)`
- **Update Operations**: `collection.updateOne(filter, update)`
- **Delete Operations**: `collection.deleteOne(filter)`
- **Count Operations**: `collection.countDocuments()`
- **Indexing**: Optimized queries on `createdAt` fields

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google Cloud account (for deployment)

### Local Development

1. **Clone and install**
   ```bash
   git clone https://github.com/alexiszxcv/threshold-web.git
   cd threshold-web
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
   MONGODB_DB=threshold
   ```

3. **Start development**
   ```bash
   npm run dev
   ```

4. **Test CRUD operations**
   ```bash
   node scripts/test-crud.js
   ```

## 📋 API Testing

### Test All CRUD Operations
```bash
# Test the complete CRUD functionality
node scripts/test-crud.js
```

### Manual Testing Examples
```bash
# Create a journal entry
curl -X POST http://localhost:3000/api/journal \
  -H "Content-Type: application/json" \
  -d '{"content": "My reflection", "mood": "contemplative"}'

# Get all journal entries
curl http://localhost:3000/api/journal

# Update a journal entry
curl -X PUT http://localhost:3000/api/journal \
  -H "Content-Type: application/json" \
  -d '{"id": "ObjectId", "content": "Updated content"}'

# Delete a journal entry
curl -X DELETE "http://localhost:3000/api/journal?id=ObjectId"
```

## 🚀 Deployment

### Google Cloud Run
```bash
gcloud run deploy threshold-app \
  --source . \
  --platform managed \
  --region us-east4 \
  --allow-unauthenticated \
  --set-env-vars="MONGODB_URI=your_connection_string"
```

## 📄 Documentation

- **[Complete API Documentation](./API_DOCUMENTATION.md)** - Detailed endpoint documentation
- **Database Schema** - Comprehensive collection structures
- **Error Handling** - Standardized error responses
- **Testing Guide** - CRUD operation validation

## Academic Compliance

This project demonstrates:
- **Full Stack Development** - Frontend and backend integration
- **Database Design** - MongoDB schema and relationships
- **API Development** - RESTful services with CRUD operations
- **Cloud Deployment** - Production-ready containerized deployment
- **Code Quality** - TypeScript, error handling, and testing


