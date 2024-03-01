import tensorflow as tf
from keras import layers, models
from picture_mutator import load_images
import numpy as np

# Define directories
good_image = r'C:\Users\DocKr\OneDrive\Desktop\Bootcamp\Projects\PurrView\MachineLearning\TrainingMaterial\Good'
bad_image = r'C:\Users\DocKr\OneDrive\Desktop\Bootcamp\Projects\PurrView\MachineLearning\TrainingMaterial\Bad'
good_test = r'C:\Users\DocKr\OneDrive\Desktop\Bootcamp\Projects\PurrView\MachineLearning\TrainingMaterial\Good\Test'
bad_test = r'C:\Users\DocKr\OneDrive\Desktop\Bootcamp\Projects\PurrView\MachineLearning\TrainingMaterial\Bad\Test'
good_validation = r'C:\Users\DocKr\OneDrive\Desktop\Bootcamp\Projects\PurrView\MachineLearning\TrainingMaterial\Good\Validation'
bad_validation = r'C:\Users\DocKr\OneDrive\Desktop\Bootcamp\Projects\PurrView\MachineLearning\TrainingMaterial\Bad\Validation'


# Load and preprocess images
def load_and_preprocess_images(directory):
    images = load_images(directory)
    images = np.array(images)
    images = images / 255.0  # Normalize pixel values
    return images

# Load training images
good_images = load_and_preprocess_images(good_image)
bad_images = load_and_preprocess_images(bad_image)

# Load test images
good_test_images = load_and_preprocess_images(good_test)
bad_test_images = load_and_preprocess_images(bad_test)

# Load validation images
good_validation_images = load_and_preprocess_images(good_validation)
bad_validation_images = load_and_preprocess_images(bad_validation)

# Concatenate test images and labels
test_images = np.concatenate((good_test_images, bad_test_images), axis=0)
test_labels = np.concatenate((np.ones(len(good_test_images)), np.zeros(len(bad_test_images))), axis=0)

# Concatenate training images and labels
training_images = np.concatenate((good_images, bad_images), axis=0)
training_labels = np.concatenate((np.ones(len(good_images)), np.zeros(len(bad_images))), axis=0)

# Concatenate validation images and labels
validation_images = np.concatenate((good_validation_images, bad_validation_images), axis=0)
validation_labels = np.concatenate((np.ones(len(good_validation_images)), np.zeros(len(bad_validation_images))), axis=0)

# Define model architecture
model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])

# Compile the model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(training_images, training_labels, epochs=10, batch_size=64, validation_data=(validation_images, validation_labels))
# Evaluate the model on the test dataset
test_loss, test_accuracy = model.evaluate(test_images, test_labels)

# Print the test accuracy
print('Test Accuracy:', test_accuracy)

# Save the model
model.save('eye_detection_model.keras')
