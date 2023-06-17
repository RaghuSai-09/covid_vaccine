const VaccinationCenter = require('../models/VaccinationCenter');
const User = require('../models/User');
// Admin login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password);
  try {
    

    // Find the user in the database by email
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the user is an admin
    if (!user.isAdmin) {
      return res.status(401).json({ message: 'You do not have admin privileges' });
      
    }    
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Invalid email or password' });
    }else{
      res.status(200).json({ message: 'Admin login successful' });}

    // Compare the provided password with the hashed password in the database
    
  } catch (error) {
    res.status(500).json({ message: 'Admin login failed' });
  }
};

// Add vaccination center
exports.addVaccinationCenter = async (req, res) => {
  try {
    const { name, address, workingHours, dosage } = req.body;

    // Create a new vaccination center
    const vaccinationCenter = new VaccinationCenter({ name, address, workingHours, dosage });
    await vaccinationCenter.save();

    res.status(201).json({ message: 'Vaccination center added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add vaccination center' });
  }
};

// Get dosage details
exports.getDosageDetails = async (req, res) => {
  try {
    // Group vaccination centers by dosage details
    const dosageDetails = await VaccinationCenter.aggregate([
      {
        $group: {
          _id: '$name',
          totalDosage: { $sum: '$dosage' },
        },
      },
    ]);

    res.status(200).json(dosageDetails);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get dosage details' });
  }
};

// Remove vaccination center
exports.removeVaccinationCenter = async (req, res) => {
  try {
    const { id } = req.params;

    // Remove vaccination center by ID
    await VaccinationCenter.findByIdAndRemove(id);

    res.status(200).json({ message: 'Vaccination center removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove vaccination center' });
  }
};
