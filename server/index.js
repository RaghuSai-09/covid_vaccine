// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const uri = "mongodb+srv://raghusaikosana:raghusai2002@covid.bjiync2.mongodb.net/?retryWrites=true&w=majority"
const db = "mongodb+srv://raghusaikosana:raghusai@cluster.5wroqii.mongodb.net/?retryWrites=true&w=majority"
// MongoDB connection
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB', error);
  });

// Routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
