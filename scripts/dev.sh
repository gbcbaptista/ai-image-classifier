#!/bin/bash

echo "Starting AI Image Classifier in Development Mode..."

# Load development environment
if [ -f .env.dev ]; then
    export $(cat .env.dev | xargs)
fi

# Start development services
docker-compose -f docker-compose.dev.yml up --build

echo "Development environment started!"