# Threshold App - API Documentation

## Overview

This API provides full CRUD (Create, Read, Update, Delete) operations for all core modules of the Threshold application. All endpoints use MongoDB for data persistence and follow RESTful conventions.

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://threshold-1054224705034.us-east4.run.app/api`

## Core Modules

### 1. Journal Entries (`/api/journal`)

#### GET `/api/journal`
Retrieve all journal entries (limited to 10 most recent)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "ObjectId",
      "content": "string",
      "timestamp": "ISO string",
      "mood": "string",
      "isAnonymous": true,
      "underlines": 0,
      "marginNotes": 0,
      "createdAt": "Date",
      "updatedAt": "Date"
    }
  ],
  "count": 10
}
```

#### POST `/api/journal`
Create a new journal entry

**Request Body:**
```json
{
  "content": "My reflection for today...",
  "mood": "contemplative",
  "isAnonymous": true,
  "timestamp": "2025-08-08T12:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "id": "ObjectId",
  "message": "Entry added to the communal journal"
}
```

#### PUT `/api/journal`
Update an existing journal entry

**Request Body:**
```json
{
  "id": "ObjectId",
  "content": "Updated content...",
  "mood": "peaceful",
  "underlines": 5,
  "marginNotes": 2
}
```

#### DELETE `/api/journal?id=ObjectId`
Delete a journal entry

**Response:**
```json
{
  "success": true,
  "message": "Journal entry deleted",
  "deletedCount": 1
}
```

### 2. Letters (`/api/letters`)

#### GET `/api/letters`
Get letter count (default) or full letters with content

**Query Parameters:**
- `includeContent=true` - Returns full letter data instead of just count

**Response (count only):**
```json
{
  "count": 15,
  "message": "15 letters have been written in this space"
}
```

**Response (with content):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "ObjectId",
      "content": "Dear...",
      "recipient": "Future Self",
      "isUnsent": true,
      "createdAt": "Date",
      "sentAt": "Date" // if sent
    }
  ],
  "count": 15
}
```

#### POST `/api/letters`
Write a new letter

**Request Body:**
```json
{
  "content": "Dear Future Self...",
  "recipient": "Future Self"
}
```

#### PUT `/api/letters`
Update letter (edit content or mark as sent)

**Request Body:**
```json
{
  "id": "ObjectId",
  "content": "Updated letter content...",
  "isUnsent": false,  // Mark as sent
  "recipient": "Updated recipient"
}
```

#### DELETE `/api/letters?id=ObjectId`
Delete a letter

### 3. Confessions (`/api/confessions`)

#### GET `/api/confessions`
Retrieve all confessions (limited to 20 most recent)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "ObjectId",
      "duration": 120,
      "timestamp": "ISO string",
      "createdAt": "Date"
    }
  ],
  "count": 20
}
```

#### POST `/api/confessions`
Record a new confession

**Request Body:**
```json
{
  "duration": 120  // Duration in seconds
}
```

#### PUT `/api/confessions`
Update confession metadata

**Request Body:**
```json
{
  "id": "ObjectId",
  "duration": 180
}
```

#### DELETE `/api/confessions?id=ObjectId`
Delete a confession

### 4. Growth Moments (`/api/growth`)

#### GET `/api/growth`
Retrieve all growth moments (limited to 20 most recent)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "ObjectId",
      "reflection": "I realized that...",
      "intention": "Tomorrow I will...",
      "createdAt": "Date"
    }
  ],
  "count": 20
}
```

#### POST `/api/growth`
Record a new growth moment

**Request Body:**
```json
{
  "reflection": "I realized that patience is a practice, not a destination.",
  "intention": "Tomorrow I will take three deep breaths before responding to challenges."
}
```

#### PUT `/api/growth`
Update a growth moment

**Request Body:**
```json
{
  "id": "ObjectId",
  "reflection": "Updated reflection...",
  "intention": "Updated intention..."
}
```

#### DELETE `/api/growth?id=ObjectId`
Delete a growth moment

## Database Schema

### Collections

#### `journal_entries`
```javascript
{
  _id: ObjectId,
  content: String,
  timestamp: String,
  mood: String,
  isAnonymous: Boolean,
  underlines: Number,
  marginNotes: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### `letters`
```javascript
{
  _id: ObjectId,
  content: String,
  recipient: String,
  isUnsent: Boolean,
  createdAt: Date,
  sentAt: Date, // Optional
  updatedAt: Date // Optional
}
```

#### `confessions`
```javascript
{
  _id: ObjectId,
  duration: Number, // seconds
  timestamp: String,
  createdAt: Date,
  updatedAt: Date // Optional
}
```

#### `growth_moments`
```javascript
{
  _id: ObjectId,
  reflection: String,
  intention: String,
  createdAt: Date,
  updatedAt: Date // Optional
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message describing what went wrong",
  "status": 400 // or 404, 500, etc.
}
```

## Example Usage

### Test CRUD Operations with curl

```bash
# Create a journal entry
curl -X POST http://localhost:3000/api/journal \
  -H "Content-Type: application/json" \
  -d '{"content": "Testing the API", "mood": "curious"}'

# Get all journal entries
curl http://localhost:3000/api/journal

# Update a journal entry
curl -X PUT http://localhost:3000/api/journal \
  -H "Content-Type: application/json" \
  -d '{"id": "ObjectId", "content": "Updated content", "underlines": 3}'

# Delete a journal entry
curl -X DELETE "http://localhost:3000/api/journal?id=ObjectId"
```

## MongoDB Queries Utilized

The API implements various MongoDB operations:

- **Find operations**: `collection.find({})` with sorting and limiting
- **Insert operations**: `collection.insertOne(document)`
- **Update operations**: `collection.updateOne(filter, update)`
- **Delete operations**: `collection.deleteOne(filter)`
- **Count operations**: `collection.countDocuments()`
- **Aggregation**: Sorting by `createdAt: -1` for chronological order

## Security Features

- Environment variable protection for MongoDB URI
- Input validation on required fields
- ObjectId validation for database operations
- Anonymous data collection by default
- Rate limiting ready (middleware configured)
- CORS configuration for cross-origin requests

## Performance Optimizations

- Connection pooling with singleton MongoDB client
- Efficient querying with limits on result sets
- Indexes on `createdAt` fields for sorting performance
- Lazy database connections (connect only when needed)

This API fully satisfies the Iteration 2 requirements by providing comprehensive CRUD operations for all core application modules with MongoDB integration.
