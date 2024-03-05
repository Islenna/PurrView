const { authenticate } = require('../config/jwt.config');
const PetController = require('../controllers/pet.controller');

module.exports = (app) => {
    // Pet routes
    /**
     * @swagger
     * tags:
     *   name: Pets
     *   description: Pet management
     * /api/pets/new:
     *   post:
     *     description: Create a new pet
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Error
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               species:
     *                 type: string
     *               breed:
     *                 type: string
     *               ageYear:
     *                 type: number
     *               ageMonth:
     *                 type: number
     */

    app.post('/api/pets/new', authenticate, PetController.create);
    /**
     * @swagger
     * tags:
     *   name: Pets
     *   description: Pet management
     * /api/pets:
     *   get:
     *     description: Returns all pets
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Error
     */
    app.get('/api/pets', authenticate, PetController.getAll);
    /**
     * @swagger
     * tags:
     *   name: Pets
     *  description: Pet management
     * /api/pets/{id}:
     *   get:
     *     description: Returns one pet
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Error
     */
    app.get('/api/pets/:id', authenticate, PetController.getOne);
    /**
     * @swagger
     * tags:
     *   name: Pets
     *   description: Pet management
     * /api/pets/{id}:
     *   put:
     *     description: Update one pet
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Error
     */
    app.put('/api/pets/:id', authenticate, PetController.update);
    /**
     * @swagger
     * tags:
     *   name: Pets
     *   description: Pet management
     * /api/pets/{id}:
     *   delete:
     *     description: Delete one pet
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Error
     */
    app.delete('/api/pets/:id', authenticate, PetController.delete);

    /**
     * @swagger
     * tags:
     *   name: Pets
     *   description: Pet management
     * /api/pets/owner/{id}:
     *   get:
     *     description: Returns all pets by owner
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Error
     */
    app.get('/api/pets/owner/:id', authenticate, PetController.getByOwner);
}