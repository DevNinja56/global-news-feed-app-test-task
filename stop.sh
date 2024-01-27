#!/bin/bash

# Stop Docker containers and remove volumes

# Navigate to the frontend directory
echo "Navigate to the frontend directory"

cd frontend/

# Stop and remove frontend containers and associated volumes
docker-compose down -v

# Navigate to the backend directory
echo "Navigate to the backend directory"

cd ../backend/


# Stop and remove backend containers and associated volumes
docker-compose down -v

echo "All services stopped and volumes removed."
