from classifier import ImageClassifier
import os

classifier = ImageClassifier()
image_path = os.path.join(os.path.dirname(__file__), "test_image.jpg")
results = classifier.predict(image_path)
print(results)