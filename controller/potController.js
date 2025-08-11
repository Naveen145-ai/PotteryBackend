const potModel = require('../models/potModel');

// Add Pot
exports.addPot = async (req, res) => {
  try {
    const { name, category, price, description, image } = req.body;
    if (!image) return res.status(400).json({ success: false, message: "Image URL is required" });

    const pot = new potModel({ name, category, price, description, image });
    await pot.save();

    // Emit real-time notification
    const io = req.app.get('io');
    io.emit('newPot', { name, category, price, description, image });

    res.status(201).json({ success: true, pot });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllPots = async (req, res) => {
  try {
    const pots = await potModel.find();
    res.status(200).json({ success: true, pots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update Pot
exports.updatePot = async (req, res) => {
    const { id } = req.params;
    const { name, category, price, description, image } = req.body;

    try {
        const updatedPot = await potModel.findByIdAndUpdate(
            id,
            { name, category, price, description, image },
            { new: true }
        );

        if (!updatedPot) {
            return res.status(404).json({ message: 'Pot not found' });
        }

        res.status(200).json({ message: 'Pot updated successfully', pot: updatedPot });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Pot
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
};
