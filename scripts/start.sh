#!/bin/bash

echo "Starting AI Image Classifier..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Please start Docker first."
    exit 1
fi

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Build and start services
echo "Building and starting services..."
docker-compose up --build -d

# Wait for services to be healthy
echo "Waiting for services to be ready..."
sleep 10

# Check service health
echo "Checking service health..."
curl -f http://localhost:8000/health > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "ML Service is healthy"
else
    echo "ML Service is not responding"
fi

curl -f http://localhost:3001/api/health > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "API Gateway is healthy"
else
    echo "API Gateway is not responding"
fi

echo ""
echo "Services started successfully!"
echo "ML Service: http://localhost:8000"
echo "API Gateway: http://localhost:3001"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "To stop services: ./scripts/stop.sh"
echo "To view logs: docker-compose logs -f"