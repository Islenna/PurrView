const {authenticate} = require('../config/jwt.config');
const PetController = require('../controllers/pet.controller');

module.exports = (app) => {
    // Pet routes
    app.post('/api/pets/new', authenticate, PetController.create);
    app.get('/api/pets', authenticate, PetController.getAll);
    app.get('/api/pets/:id', authenticate, PetController.getOne);
    app.put('/api/pets/:id', authenticate, PetController.update);
    app.delete('/api/pets/:id', authenticate, PetController.delete);
    app.put('/api/pets/:id/like', authenticate, PetController.like);
    app.put('/api/pets/:id/unlike', authenticate, PetController.unlike);
}