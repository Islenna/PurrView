const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"]
    },
    species: {
        type: String,
        required: [true, "Species is required"],
        enum: ["Dog", "Cat"],
    },
    breed: {
        type: String,
        required: [true, "Breed is required"],
        minlength: [3, "Breed must be at least 3 characters long"]
    },
    ageYear: {
        type: Number,
        required: [true, "Age is required"],
        min: [0, "Age must be at least 0"]

    },
    ageMonth: {
        type: Number,
        required: [true, "Age is required"],
        min: [0, "Month must be at least 0"],
        max: [11, "Month must be less than 12"]
    },
    sex: {
        type: String,
        required: [true, "Sex is required"],
        enum: ["Male", "Female", "Neutered", "Spayed", "Unknown"]
    },
}, { timestamps: true });

module.exports.Pet = mongoose.model('Pet', PetSchema);
