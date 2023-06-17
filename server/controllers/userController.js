// controllers/userController.js
const bookslot = require('../models/bookslot') 
const VaccinationCenter = require('../models/VaccinationCenter');

// Search vaccination centers
exports.searchVaccinationCenters = async (req, res) => {
  try {
    const { query } = req.query;

    // Search centers based on query
    const centers = await VaccinationCenter.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { workingHours: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json(centers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search vaccination centers' });
  }
};

exports.vaccine = async (req,res) => {
  try{
    const center = await VaccinationCenter.find({})
    res.status(200).json(center);
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to search vaccination centers' });
  }
};
exports.Slot = async(req,res) => {
  try {
    // Get the slot data from the request body
    const { slot } = req.body;

    // Check if the slot is available
    const existingSlot = await bookslot.findOne({ slot: slot });
    if (!existingSlot) {
      return res.status(400).json({ message: 'Slot is not available' });
    }

    // Check if the slot is already booked
    if (existingSlot.booked) {
      return res.status(400).json({ message: 'Slot is already booked' });
    }

    // Book the slot
    existingSlot.booked = true;
    await existingSlot.save();

    // Send a success response
    res.status(200).json({ message: 'Slot booked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
