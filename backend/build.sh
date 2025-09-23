#!/bin/bash
# Build script for Render deployment

echo "🔨 Starting backend deployment build..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run any database migrations or setup if needed
echo "🗄️ Setting up database..."
# Add any database setup commands here

echo "✅ Backend build completed successfully!"

# The server will be started by Render using the start command