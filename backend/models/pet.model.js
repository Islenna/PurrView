const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
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
    skill1: {
        type: String,
        default: ""
    },
    skill2: {
        type: String,
        default: ""
    },
    skill3: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports.Pet = mongoose.model('Pet', PetSchema);
