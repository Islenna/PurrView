import cv2
import numpy as np
import os

# Desired width and height for resizing
desired_width = 224
desired_height = 224

# Function to load and preprocess images
def load_images(directory):
    images = []
    # Iterate over files in the directory
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        if os.path.isfile(filepath) and (filename.lower().endswith(".jpg") or filename.lower().endswith(".jpeg") or filename.lower().endswith(".png")):
            # Load image
            try:
                image = cv2.imread(filepath)
                if image is not None:
                    print(f"Loaded image: {filename}")
                    # Resize image to desired dimensions
                    image = cv2.resize(image, (desired_width, desired_height))
                    # Convert image to NumPy array and normalize pixel values
                    image = np.array(image, dtype=np.float32) / 255.0
                    # Add image to list
                    images.append(image)
                else:
                    print(f"Failed to load image: {filename}")
            except Exception as e:
                print(f"Error loading image {filename}: {e}")
        else:
            print(f"Ignoring non-image file: {filename}")
    return np.array(images)

# Directory containing the validation images
validation_directory = r'C:\Users\DocKr\OneDrive\Desktop\Bootcamp\Projects\PurrView\MachineLearning\TrainingMaterial\Good\Validation'

# Load and preprocess validation data
validation_images = load_images(validation_directory)
print(f"Number of validation images loaded: {len(validation_images)}")

# Directory containing the test images
test_directory = r'C:\Users\DocKr\OneDrive\Desktop\Bootcamp\Projects\PurrView\MachineLearning\TrainingMaterial\Good\Test'

# Load and preprocess test data
test_images = load_images(test_directory)
print(f"Number of test images loaded: {len(test_images)}")

# Directory containing the training images
training_directory = r'C:\Users\DocKr\OneDrive\Desktop\Bootcamp\Projects\PurrView\MachineLearning\TrainingMaterial\Good'

# Load and preprocess training data
training_images = load_images(training_directory)
print(f"Number of training images loaded: {len(training_images)}")
