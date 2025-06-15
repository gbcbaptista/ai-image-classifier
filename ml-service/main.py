from fastapi import FastAPI, HTTPException, UploadFile, File
from app.models.classifier import ImageClassifier
from app.middleware.timing_middleware import TimingMiddleware
from PIL import Image
import logging
import io

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="AI Image Classifier", version="1.0.0")

app.add_middleware(TimingMiddleware)
classifier = ImageClassifier()

@app.get("/")
def root():
  return {"message": "AI Image Classifier API"}

@app.get("/health")
def health_check():
  return { "status" : "healthy" }

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
  logger.info(f"Received file: {file.filename}, type: {file.content_type}")
  
  if file.content_type not in ["image/jpeg", "image/png"]:
    logger.warning(f"Invalid file type: {file.content_type}")
    raise HTTPException(400, "Use JPEG or PNG image")
  
  try:
    content = await file.read()
    img = Image.open(io.BytesIO(content))

    results = classifier.predict(img)
    logger.info(f"Prediction successful for {file.filename}")

    return {
      "filename": file.filename,
      "predictions": [
        {"label": label, "confidence": round(conf * 100, 2)} for label, conf in results
      ]
    }

  except Exception as e:
    logger.error(f"Error processing {file.filename}: {str(e)}")
    raise HTTPException(500, f"Error processing image: {str(e)}")