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

exports.getAllPots = async (req, res) => {
    try {
        const pots = await potModel.find();
        res.status(200).json({ pots });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updatePot = async (req, res) => {
    const { id } = req.params;
    const { name, category, price, description, image } = req.body;

    try {
        const updatedPot = await potModel.findByIdAndUpdate(id, {
            name, category, price, description, image
        }, { new: true });

        if (!updatedPot) {
            return res.status(404).json({ message: 'Pot not found' });
        }

        res.status(200).json({ message: 'Pot updated successfully', pot: updatedPot });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deletePot = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPot = await potModel.findByIdAndDelete(id);

        if (!deletedPot) {
            return res.status(404).json({ message: 'Pot not found' });
        }

        res.status(200).json({ message: 'Pot deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}