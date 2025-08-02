# Threshold 🌙

A contemplative digital sanctuary built with Next.js and MongoDB, designed for reflection, growth, and anonymous sharing in a liminal space between day and night.

<img width="417" height="677" alt="Screenshot 2025-08-02 at 12 18 27 AM" src="https://github.com/user-attachments/assets/2b1b0379-63e6-4232-ba80-bee6af961a47" />

## 🌟 Features

### Core Spaces
- **📖 Library** - Journal your thoughts and experiences

<img width="594" height="454" alt="Screenshot 2025-08-02 at 12 18 52 AM" src="https://github.com/user-attachments/assets/edf5ccd6-711f-4153-ad14-cfb53f39a3cc" />

- **🌱 Garden** - Track personal growth moments

<img width="440" height="474" alt="Screenshot 2025-08-02 at 12 19 09 AM" src="https://github.com/user-attachments/assets/bb7fb91f-e47d-4912-ba10-26ee95bb51de" />

- **💌 Mailroom** - Send and receive anonymous letters

<img width="457" height="608" alt="Screenshot 2025-08-02 at 12 19 32 AM" src="https://github.com/user-attachments/assets/b32b548d-41f9-404d-9f67-ceb7af26363c" />

- **🤫 Confessional** - Share anonymous confessions

<img width="273" height="298" alt="Screenshot 2025-08-02 at 12 19 52 AM" src="https://github.com/user-attachments/assets/7c80ce31-7191-4e41-bb8b-8e82fcf5cbb5" />

- **🏛️ Hallway** - Navigate between spaces

<img width="329" height="310" alt="Screenshot 2025-08-02 at 12 20 16 AM" src="https://github.com/user-attachments/assets/7c004765-9c78-40d7-aa63-6db5b7f0dbb8" />

- **🎵 Soundscape** - Ambient audio for contemplation

<img width="364" height="413" alt="Screenshot 2025-08-02 at 12 20 42 AM" src="https://github.com/user-attachments/assets/0b7fa136-1090-43dc-aae3-c05b2fc594e2" />


### Technical Features
- **Real-time Data** - MongoDB integration for persistent storage
- **Responsive Design** - Works on desktop and mobile
- **Anonymous Interactions** - Privacy-first approach
- **Cloud Deployment** - Deployed on Google Cloud Run
- **Modern Stack** - Next.js 14, TypeScript, Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend
- **MongoDB** - Document database
- **Next.js API Routes** - Serverless functions
- **Express middleware** - CORS, compression, rate limiting

### Deployment
- **Google Cloud Run** - Containerized deployment
- **Docker** - Multi-stage builds for optimization
- **Cloud Build** - Automated CI/CD

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Google Cloud account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/threshold-app.git
   cd threshold-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   MONGODB_DB=threshold
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   chmod +x scripts/setup-database.sh
   ./scripts/setup-database.sh
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
threshold-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── confessions/   # Confessions API
│   │   ├── growth/        # Growth moments API
│   │   ├── journal/       # Journal entries API
│   │   └── letters/       # Letters API
│   ├── confessional/      # Confessional page
│   ├── garden/           # Garden page
│   ├── hallway/          # Hallway page
│   ├── library/          # Library page
│   ├── mailroom/         # Mailroom page
│   ├── soundscape/       # Soundscape page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   └── ui/               # UI component library
├── lib/                  # Utilities and configurations
│   ├── mongodb.ts        # MongoDB connection
│   └── utils.ts          # Helper functions
├── scripts/              # Build and deployment scripts
├── Dockerfile            # Container configuration
├── cloudbuild.yaml       # Google Cloud Build config
└── next.config.js        # Next.js configuration
```

## 🗄️ Database Schema

### Collections

#### Journal Entries
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

#### Letters
```javascript
{
  _id: ObjectId,
  content: String,
  sender: String, // "Anonymous" or name
  recipient: String,
  isDelivered: Boolean,
  createdAt: Date,
  deliveredAt: Date
}
```

#### Confessions
```javascript
{
  _id: ObjectId,
  content: String,
  isAnonymous: Boolean,
  category: String,
  createdAt: Date
}
```

#### Growth Moments
```javascript
{
  _id: ObjectId,
  content: String,
  category: String, // "realization", "milestone", "challenge"
  intensity: Number, // 1-10
  isPrivate: Boolean,
  createdAt: Date
}
```

## 🌐 API Endpoints

### Journal API
- `GET /api/journal` - Fetch all journal entries
- `POST /api/journal` - Create new journal entry

### Letters API
- `GET /api/letters` - Fetch all letters
- `POST /api/letters` - Send new letter

### Confessions API
- `GET /api/confessions` - Fetch all confessions
- `POST /api/confessions` - Submit new confession

### Growth API
- `GET /api/growth` - Fetch growth moments
- `POST /api/growth` - Record new growth moment

## 🚀 Deployment

### Google Cloud Run

1. **Set up Google Cloud CLI**
   ```bash
   # Install gcloud CLI
   brew install google-cloud-sdk
   
   # Authenticate
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. **Deploy using the automated script**
   ```bash
   chmod +x scripts/deploy-cloud-run.sh
   ./scripts/deploy-cloud-run.sh
   ```

3. **Or deploy manually**
   ```bash
   gcloud run deploy threshold-app \
     --source . \
     --platform managed \
     --region us-east4 \
     --allow-unauthenticated \
     --set-env-vars="MONGODB_URI=your_connection_string,NODE_ENV=production"
   ```

### Environment Variables for Production
```bash
MONGODB_URI=mongodb+srv://...
MONGODB_DB=threshold
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-app-url
NEXT_PUBLIC_APP_URL=https://your-app-url
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting (configured in ESLint)

### Testing
```bash
# Test database connection
node scripts/test-connection.js

# Test local build
npm run build
npm start
```

## 🔒 Security

- Environment variables are gitignored
- Anonymous data collection only
- Rate limiting on API endpoints
- CORS configuration for production
- MongoDB connection encryption



## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Hosted on [Google Cloud Run](https://cloud.google.com/run)
  

*"In the threshold between day and night, we find space for reflection."*
