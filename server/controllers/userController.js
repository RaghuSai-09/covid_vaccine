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

exports.Slot = async (req, res) => {
  try {
    const { name, email, center, address, date } = req.body;
    const existingSlot = await bookslot.findOne({ date: date, booked: true });
    if (existingSlot) {
      return res.status(400).json({ message: 'Slot is already booked' });
    }
    const bookedSlotsCount = await bookslot.countDocuments({ date: date, booked: true });
    if (bookedSlotsCount >= 10) {
      return res.status(400).json({ message: 'Maximum limit for bookings on this date reached' });
    }
    const newSlot = new bookslot({
      name: name,
      email: email,
      center_address: address,
      date: date,
      booked: true,
    });
    await newSlot.save();
    res.status(200).json({ message: 'Slot booked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
