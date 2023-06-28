// controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User signup
exports.signup = async (req, res) => {
  const {name, email, password } = req.body;
  console.log(email);
  
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    console.log()
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User does not exists' });
    }
    else{if(user.isAdmin){
      console.log("You are an admin");
      return res.status(201).json({ message: 'You are an admin' });
    }
    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Wrong Password' });
    }}
    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Authentication failed' });
  }
};

exports.logout = async (req, res) => {
  const { userId } = req.body; 
  console.log(userId);
  try {
    
    const user = await User.findOne(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Clear or invalidate the token
    user.token = ''; // Set the token field to an empty string

    // Save the updated user record
    await user.save();

    // Send a response indicating successful logout
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  
};