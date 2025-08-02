#!/bin/bash

echo "🚀 Deploying Threshold App to Cloud Run"
echo "========================================"

# Set your specific Cloud Run URL and MongoDB URI
CLOUD_RUN_URL="https://threshold-1054224705034.us-east4.run.app"
MONGODB_URI="mongodb+srv://mercialexis7:kQUiAAWDEiW1nJAD@cluster0.jywh1bn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
PROJECT_ID=$(gcloud config get-value project)

echo "📦 Project ID: $PROJECT_ID"
echo "🌐 Cloud Run URL: $CLOUD_RUN_URL"
echo "🍃 MongoDB: cluster0.jywh1bn.mongodb.net"

# Build and deploy using Cloud Build
echo "🔨 Building and deploying..."
gcloud builds submit --config cloudbuild.yaml

# Update environment variables with MongoDB URI
echo "🔧 Setting environment variables..."
gcloud run services update threshold-app \
  --region=us-east4 \
  --set-env-vars="MONGODB_URI=$MONGODB_URI,NODE_ENV=production,FRONTEND_URL=$CLOUD_RUN_URL,NEXT_PUBLIC_API_URL=$CLOUD_RUN_URL,NEXT_PUBLIC_APP_URL=$CLOUD_RUN_URL"

# Get the service URL
SERVICE_URL=$(gcloud run services describe threshold-app --region=us-east4 --format="value(status.url)")

echo "✅ Deployment complete!"
echo "🌐 Your app is live at: $SERVICE_URL"
echo "🔍 Health check: $SERVICE_URL/health"
echo "📊 API endpoints: $SERVICE_URL/api"

# Test the deployment
echo "🧪 Testing deployment..."
echo "Testing health endpoint..."
curl -s "$SERVICE_URL/health" | jq '.' || echo "Health check response received"

echo "Testing journal API..."
curl -s "$SERVICE_URL/api/journal/stats" | jq '.' || echo "Journal API response received"

echo ""
echo "🎉 Deployment and testing complete!"
echo "Visit your app at: $SERVICE_URL"
