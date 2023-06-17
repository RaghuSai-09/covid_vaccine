// models/VaccinationCenter.js

const mongoose = require('mongoose');

const vaccinationCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  workingHours: {
    type: String,
    required: true,
  },
  availableSlots: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('VaccinationCenter', vaccinationCenterSchema);
