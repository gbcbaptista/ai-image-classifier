from fastapi import FastAPI, HTTPException, UploadFile, File
from app.models.classifier import ImageClassifier
import tempfile
import os

app = FastAPI(title="AI Image Classifier", version="1.0.0")
classifier = ImageClassifier()

@app.get("/")
def root():
  return {"message": "AI Image Classifier API"}

@app.get("/health")
def health_check():
  return { "status" : "healthy" }

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
  
  if file.content_type not in ["image/jpeg", "image.png"]:
    raise HTTPException(400, "Use JPEG or PNG image")
  
  with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
    content = await file.read()
    tmp.write(content)
    tmp_path = tmp.name
  
  try:
    results = classifier.predict(tmp_path)

    return {
      "filename": file.filename,
      "predictions": [
        {"label": label, "confidence": round(conf * 100, 2)} for label, conf in results
      ]
    }

  finally:
    os.unlink(tmp_path)