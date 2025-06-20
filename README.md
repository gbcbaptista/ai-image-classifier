# 🖼️ AI Image Classifier

> A full-stack web application that classifies images in real-time using Transfer Learning with MobileNetV2

## 🎯 Overview

This project demonstrates a complete end-to-end machine learning pipeline integrated into a modern web application. Users can upload images through an intuitive React interface and receive instant AI-powered classifications with confidence scores.

The application leverages **Transfer Learning** with Google's MobileNetV2 model, pre-trained on ImageNet dataset, to identify objects across 1,000+ categories including animals, vehicles, food, and everyday objects.

## ✨ Key Features

- **Drag & Drop Image Upload** - Intuitive file upload with instant preview
- **Real-time Classification** - Get predictions in under 1 second
- **Top-3 Predictions** - View the most likely classifications with confidence percentages
- **Classification History** - Track recent predictions locally
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🏗️ Architecture

The project follows a **microservices architecture** with clear separation of concerns:

```
┌─────────────┐    HTTP/REST    ┌─────────────┐    HTTP/REST    ┌─────────────┐
│   React     │ ──────────────► │   NestJS    │ ──────────────► │   Python    │
│  Frontend   │                 │   Gateway   │                 │  ML Service │
└─────────────┘                 └─────────────┘                 └─────────────┘
```

- **Frontend**: React handles user interactions and displays results
- **API Gateway**: NestJS manages requests, validation, and orchestration
- **ML Service**: Python/FastAPI serves the MobileNetV2 model for inference

## 🛠️ Tech Stack

| Layer                    | Technology                                  |
| ------------------------ | ------------------------------------------- |
| **Frontend**             | React + TypeScript                          |
| **Backend**              | NestJS + TypeScript                         |
| **ML Service**           | Python + FastAPI + TensorFlow               |
| **Model**                | MobileNetV2 (Transfer Learning)             |
| **Containerization**     | Docker + Docker Compose                     |
| **Cloud Infrastructure** | AWS ECS Fargate + Application Load Balancer |
| **Communication**        | REST APIs                                   |

## 🚀 How It Works

1. **Upload**: User drags and drops an image or selects from file picker
2. **Processing**: NestJS validates the image and forwards it to the Python ML service
3. **Inference**: MobileNetV2 model processes the image and returns predictions
4. **Results**: Top 3 classifications are displayed with confidence percentages
5. **History**: Recent predictions are stored locally for quick reference

## 🎨 User Experience

```
🖼️ [Golden Retriever Photo]

✅ CLASSIFICATION RESULTS

🏆 Golden Retriever - 85.42%
🥈 Nova Scotia Duck Tolling Retriever - 8.76%
🥉 Labrador Retriever - 2.34%

⏱️ Processed in 0.23s
```

## 🏆 Technical Highlights

- **Enterprise Architecture**: Microservices with TypeScript and dependency injection
- **Machine Learning**: Transfer Learning implementation with pre-trained neural networks
- **Cloud Native**: Containerized deployment on AWS with load balancing
- **Performance Optimized**: Sub-second inference times with efficient model serving
- **Production Ready**: Comprehensive error handling, logging, and health checks

## 🛠️ Implementation

### ML Service

The ML Service was implemented using **FastAPI** and **TensorFlow** with the pre-trained **MobileNetV2** model from the ImageNet dataset. MobileNetV2 was chosen for its mobile-optimized architecture that provides an excellent balance between accuracy (92%+ top-5 accuracy) and inference speed (sub-second response times). The service implements Transfer Learning by leveraging 1,000+ pre-trained classifiers, eliminating the need to train a model from scratch. The architecture includes custom timing middleware for request monitoring, robust image validation with automatic RGB conversion, and structured logging for production monitoring. The processing pipeline automatically resizes images to 224x224 pixels, applies MobileNet-specific preprocessing, and returns top-3 predictions with confidence scores, ensuring consistent response times even with high-resolution images.

### Docker Implementation

The application uses multi-stage Docker builds with optimized Python 3.9 slim images for the ML service. Docker Compose will orchestrates all three microservices (React, NestJS, Python) with proper networking and health checks. The containerized architecture ensures consistent deployment across development and production environments while maintaining sub-second inference performance.

### NestJS Gateway

The NestJS Gateway serves as the orchestration layer implementing enterprise-grade API patterns with **TypeScript** and **dependency injection**. Built on NestJS's modular architecture, the gateway provides robust request validation using class-validator DTOs, comprehensive error handling with global exception filters, and structured logging for production monitoring. The service implements secure file upload handling through Multer with strict validation (JPEG/PNG only, 10MB limit) and maintains persistent HTTP connections to the Python ML service using Axios with configurable timeouts and retry logic. The architecture includes dedicated health check endpoints for both the gateway and ML service monitoring, CORS configuration for seamless frontend integration, and middleware-based request timing for performance analytics. All responses are standardized through DTOs ensuring type safety across the entire stack, while the modular design allows for easy scaling and maintenance of individual service components.
