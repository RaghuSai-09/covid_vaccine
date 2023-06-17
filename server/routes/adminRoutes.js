// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Admin login
router.post('/login', adminController.login);

// Add vaccination center
router.post(
  '/vaccination-centers',
  authMiddleware.isAdmin,
  adminController.addVaccinationCenter
);

// Get dosage details
router.get('/dosage-details', authMiddleware.isAdmin, adminController.getDosageDetails);

// Remove vaccination center
router.delete(
  '/vaccination-centers/:id',
  authMiddleware.isAdmin,
  adminController.removeVaccinationCenter
);

module.exports = router;
