#!/bin/bash

# Deploy Script for Global News Feed App

# Navigate to the backend directory
echo "Navigate to the backend directory"

cd backend/

# Build and run the backend Docker container
docker-compose up -d

# Navigate to the frontend directory
echo "Navigate to the frontend directory"

cd ../frontend/

# Build and run the frontend Docker container
docker-compose up -d

# Pause for services to start (adjust the sleep duration as needed)
sleep 5

# Display service access information
echo "Global News Feed App Deployed Successfully!"
echo "------------------------------------------"
echo "Frontend is running at http://localhost:3000"
echo "Backend is running at http://localhost:3001/api"
