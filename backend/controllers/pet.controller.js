const Pet = require('../models/pet.model');
const User = require('../models/user.model');

module.exports = {
    create: async (req, res) => {
        try {
            // Access owner's ID from decoded JWT token
            const ownerId = req.user.id;

            // Add owner's ID to the request body
            req.body.owner = ownerId;

            // Create the pet
            const pet = await Pet.create(req.body);

            // Update the owner's record to include the pet
            await User.findByIdAndUpdate(ownerId, { $push: { pets: pet._id } });

            res.json(pet);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    getAll: (req, res) => {
        Pet.find()
            .then(pets => res.json(pets))
            .catch(err => res.json(err));
    },
    getOne: (req, res) => {
        Pet.findById(req.params.id)
            .then(pet => res.json(pet))
            .catch(err => res.json(err));
    },
    update: (req, res) => {
        Pet.findByIdAndUpdate
            (req.params.id, req.body
                , { new: true, runValidators: true })
            .then(pet => res.json(pet))
            .catch(err => res.status(400).json(err));
    },

    delete: (req, res) => {
        Pet.findByIdAndDelete(req.params.id)
            .then(pet => res.json(pet))
            .catch(err => res.json(err));
    },
    getByOwner: (req, res) => {
        Pet.find({ owner: req.params.id })
            .then(pets => res.json(pets))
            .catch(err => res.json(err));
    },
}
