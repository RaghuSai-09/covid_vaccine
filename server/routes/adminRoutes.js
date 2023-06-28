// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Admin login
router.post('/login', adminController.login);

// Add vaccination center
router.post(
  '/vaccinationcenters/add',
  adminController.addVaccinationCenter
);

// Get dosage details
router.get('/bookedslots', adminController.getBookedSlots);

// Remove vaccination center
router.delete(
  '/vaccinationcenters/:id',
  adminController.removeVaccinationCenter
);

module.exports = router;
