#!/bin/bash

echo "🚀 Starting ByteEvents Backend on Render..."

echo "🗄️ Running database migrations..."
npm run migrate

echo "🌱 Running database seed (optional)..."
npm run seed || echo "Seed failed or skipped"

echo "📧 Starting email worker in background..."
npm run worker &
WORKER_PID=$!

echo "🌐 Starting main application..."
npm start &
APP_PID=$!

# Function to handle shutdown
cleanup() {
    echo "🛑 Shutting down..."
    kill $WORKER_PID 2>/dev/null
    kill $APP_PID 2>/dev/null
    exit 0
}

# Trap signals for graceful shutdown
trap cleanup SIGTERM SIGINT

# Wait for any process to exit
wait
