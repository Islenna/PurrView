# ToDoList

## Backend
- [x] User CRUD
- [x] Patient CRUD
- [] User / Patient CRUD testing
- [] Validations / Security
- 
## Frontend
- [] User CRUD
- [] Patient CRUD
- [X] Routing
- [] Validations / Security
- [X] Cartoon Dog and Cat Image
- [X] Eye selectors 
- [] AuthContext & Registration
- 
## Machine Learning
- [] Train the AI
- [] Template Matching while waiting for AI training images.
- [] Connect AI to a camera.
- [] Reprocess captured image
- [] Implement template matching using OpenCV first.

### Planning Notes:
Login (Or Register if not Logged In)
Pets associated with the user OR a button that says "New Patient" that leads to a form. 
Once a pet is selected / form is completed
To a cartoon dog or cat (rendered based on the selected pet's species) for the owner to select an eye.
Navigates to the camera, where the AI will direct the user on how to acquire a better image.
AI re-proccesses the image to ensure it's a good shot, and then takes the shot (I imagine that's all under-the-hood and doesn't need a display page).
If captured imaged is good, render a page that says: Image submitted, or a toast, that kicks the user back to the pet's page OR if a bad image, goes back to the camera.