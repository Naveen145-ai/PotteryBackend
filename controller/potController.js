const potModel = require('../models/potModel');

exports.potAdmin = async (req,res) => {
    const {name, category, price, description, image} = req.body;
    try {
        const newPot = new potModel({
            name,category, price, description, image
        });
        await newPot.save();
        res.status(201).json({"message": "Pot created successfully", pot: newPot});
    } catch (error) {
        
        res.status(500).json({ message: error.message });
        
    }
}