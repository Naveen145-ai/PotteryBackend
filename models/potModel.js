const mongoose = require('mongoose');

const potSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // clay, color, metal
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String, required: true }, // image URL
}, { timestamps: true });

module.exports = mongoose.model('Pot', potSchema);
