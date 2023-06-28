const VaccinationCenter = require('../models/VaccinationCenter');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Slot = require('../models/bookslot');
// Admin login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user){
      return res.status(402).json({ message: 'User not found' });
    }
    if(!user.isAdmin) {
      return res.status(401).json({ message: `You don't have admin privileges` });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Admin login failed' });
  }
};

// Add vaccination center
exports.addVaccinationCenter = async (req, res) => {
  try {
    console.log(req.body);
    const { name, address, workingHours, dosage } = req.body;
    const vaccinationCenter = new VaccinationCenter(req.body);
    const newCenter = await vaccinationCenter.save();

    res.status(201).json({ message: 'Vaccination center added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add vaccination center' });
  }
};

// Get dosage details
exports.getBookedSlots = async (req, res) => {
  try{
    const center = await Slot.find({})
    res.status(200).json(center);
  } 
  catch (error) {
    res.status(500).json({ message: 'Failed to get Booked details' });
  }
};

// Remove vaccination center
exports.removeVaccinationCenter = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    await VaccinationCenter.findByIdAndDelete(id);
    res.status(200).json({ message: 'Vaccination center removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove vaccination center' });
  }
};
