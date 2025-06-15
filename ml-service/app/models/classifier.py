import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input, decode_predictions
from PIL import Image
import numpy as np
from typing import List, Tuple

class ImageClassifier:
  def __init__(self):
    print("Loading Model...")
    self.model = MobileNetV2(weights="imagenet")
    print('Model loaded')

  def _validate_image(self, img: Image.Image) -> Image.Image:
    if img.mode != "RGB":
      print(f"Converting image from {img.mode} to RGB")
      img = img.convert('RGB')

    if img.size[0] == 0 or img.size[1] == 0:
      raise ValueError("Invalid image dimensions")
    
    return img
  
  def predict_pil(self, img: Image.Image, top_k: int = 3) -> List[Tuple[str, float]]:
    img = self._validate_image(img)
    img_resized = img.resize((224, 224))
    img_array = np.array(img_resized)
    img_batch = np.expand_dims(img_array, axis=0)
    img_preprocessed = preprocess_input(img_batch)
    predictions = self.model.predict(img_preprocessed)
    decoded_predictions = decode_predictions(predictions, top=top_k)
    prediction = decoded_predictions[0]

    result = [(label, float(confidence)) for (_, label, confidence) in prediction]
    return result
  
  def predict(self, image_path: str, top_k: int = 3) -> List[Tuple[str, float]]:
    img = Image.open(image_path)
    return self.predict_pil(img, top_k)
  
  