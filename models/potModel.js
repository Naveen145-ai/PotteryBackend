const mongoose = require('mongoose');

const potSchema = new mongoose.Schema({
    name: {
        type: String,required: true, trim: true
    },
    category: {
        type: String, required: true, trim: true
    },
    price: {
        type: Number, required: true, min: 0
    },
    description: {
        type: String, required: true, trim: true
    },
    image: {
        type: String, required: true, trim: true
    },

   
})

const potModel = mongoose.model('Pot', potSchema);

module.exports = potModel;