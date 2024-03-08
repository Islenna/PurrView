const { authenticate } = require("../config/jwt.config");
const PetController = require("../controllers/pet.controller");

module.exports = (app) => {
    /**
     * @swagger
     * tags:
     *   - name: Pets
     *     description: Pet management
     *
     * /api/pets/new:
     *   post:
     *     tags:
     *       - Pets
     *     summary: Add a new pet
     *     description: Add a new pet to the system
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The pet's name
     *                 example: "Rex"
     *               species:
     *                 type: string
     *                 description: The pet's species
     *                 enum: ["Dog", "Cat"]
     *                 example: "Dog"
     *               breed:
     *                 type: string
     *                 description: The pet's breed
     *                 example: "Beagle"
     *               ageYear:
     *                 type: number
     *                 description: The pet's age in years
     *                 example: 4
     *                 minimum: 0
     *               ageMonth:
     *                 type: number
     *                 description: The pet's age in months
     *                 example: 6
     *                 minimum: 0
     *                 maximum: 11
     *               sex:
     *                 type: string
     *                 description: The pet's sex
     *                 enum: ["Male", "Female", "Neutered", "Spayed", "Unknown"]
     *                 example: "Spayed"
     *               owner:
     *                 type: string
     *                 description: The ID of the pet's owner
     *                 example: 5f0f2b3a0b8b3a1a6c7e2d33
     *     responses:
     *       '200':
     *         description: Pet added successfully
     *       '400':
     *         description: Bad request, validation failed
     */
    app.post("/api/pets/new", authenticate, PetController.create);

    /**
     * @swagger
     * /api/pets:
     *  get:
     *    tags:
     *      - Pets
     *    summary: Get all pets
     *    description: Retrieve all pets from the system
     *    responses:
     *      '200':
     *        description: A list of pets
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Pet'
     */
    app.get("/api/pets", authenticate, PetController.getAll);
    /**
     * @swagger
     * /api/pets/{id}:
     *   get:
     *     tags:
     *       - Pets
     *     summary: Get a single pet
     *     description: Retrieve a single pet from the system's database
     *     responses:
     *       '200':
     *         description: A single pet
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Pet'
     *       '400':
     *         description: Bad request, ID is invalid
     *       '404':
     *         description: Pet not found
     */
    app.get("/api/pets/:id", authenticate, PetController.getOne);
    /**
     * @swagger
     * /api/pets/{id}:
     *   put:
     *     tags:
     *       - Pets
     *     summary: Update a pet
     *     description: Update a pet in the system's database
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Pet'
     *     responses:
     *       '200':
     *         description: Pet updated successfully
     *       '400':
     *         description: Bad request, validation failed
     *       '404':
     *         description: Pet not found
     */
    app.put("/api/pets/:id", authenticate, PetController.update);
    /**
     * @swagger
     * /api/pets/{id}:
     *   delete:
     *     tags:
     *       - Pets
     *     summary: Delete a pet
     *     description: Delete a pet from the system's database
     *     responses:
     *       '200':
     *          description: Pet deleted successfully
     *       '400':
     *         description: Bad request, ID is invalid
     *       '404':
     *         description: Pet not found
     */
    app.delete("/api/pets/:id", authenticate, PetController.delete);

    /**
     * @swagger
     * /api/pets/owner/{id}:
     *  get:
     *    tags:
     *      - Pets
     *    summary: Get pets by owner
     *    description: Retrieve all pets from the system that belong to a specific owner
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        description: The ID of the owner
     *        schema:
     *          type: string
     *          example: 5f0f2b3a0b8b3a1a6c7e2d33
     *    responses:
     *      '200':
     *        description: A list of pets
     *      '400':
     *        description: Bad request, ID is invalid
     *      '404':
     *        description: Owner not found
     */
    app.get("/api/pets/owner/:id", authenticate, PetController.getByOwner);
}
