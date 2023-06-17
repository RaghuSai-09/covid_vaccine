// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// User signup
router.post('/signup', authController.signup);

// User login
router.post('/login', authController.login);

// Search vaccination centers
router.get('/vaccinationcenters/search', userController.searchVaccinationCenters);
router.get('/vaccinationcenters',userController.vaccine);
router.post('/slotbooking',userController.Slot);
module.exports = router;
