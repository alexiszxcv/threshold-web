#!/bin/bash

# Script to help set up URLs for different environments

echo "🌟 Threshold App URL Configuration Helper"
echo "=========================================="

# Check if we're in development or production
if [ "$NODE_ENV" = "production" ]; then
    echo "📦 Production Environment Detected"
    
    # Get Google Cloud project info
    PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
    
    if [ -n "$PROJECT_ID" ]; then
        echo "🔗 Google Cloud Project: $PROJECT_ID"
        echo "🌐 Your frontend URL will be: https://$PROJECT_ID.appspot.com"
        echo "🔧 Your backend API URL will be: https://$PROJECT_ID.appspot.com/api"
        
        # Update environment files
        echo "NEXT_PUBLIC_API_URL=https://$PROJECT_ID.appspot.com" > frontend/.env.production
        echo "NEXT_PUBLIC_APP_URL=https://$PROJECT_ID.appspot.com" >> frontend/.env.production
        
        echo "FRONTEND_URL=https://$PROJECT_ID.appspot.com" > backend/.env.production
        
        echo "✅ Environment files updated!"
    else
        echo "❌ Google Cloud project not configured. Run 'gcloud init' first."
    fi
else
    echo "🛠️  Development Environment"
    echo "🌐 Frontend URL: http://localhost:3000"
    echo "🔧 Backend API URL: http://localhost:5000"
    
    # Create development environment files
    echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > frontend/.env.local
    echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> frontend/.env.local
    
    echo "FRONTEND_URL=http://localhost:3000" > backend/.env
    echo "PORT=5000" >> backend/.env
    echo "NODE_ENV=development" >> backend/.env
    
    echo "✅ Development environment files created!"
fi

echo ""
echo "📝 Next Steps:"
echo "1. Update your MongoDB connection string in backend/.env"
echo "2. Run 'npm run dev' to start both servers"
echo "3. Visit http://localhost:3000 to see your app"
