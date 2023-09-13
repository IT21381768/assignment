const express = require('express');
const User = require('../models/employee'); 
const axios = require('axios');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const router = express.Router();

// Middleware for parsing JSON request bodies
router.use(express.json());

// Route to store user details
router.post('/register', async (req, res) => {
  try {
    const { email, location, firstName, lastName, gender, contactNo, salary } = req.body;
    const newUser = new User({ email, location, firstName, lastName, gender, contactNo, salary });
    await newUser.save();
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Route to update user location
router.put('/update-location/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { location } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, { location }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Route to get user's weather data for a given day
router.get('/weather-data/:email/:date', async (req, res) => {
  try {
    const email = req.params.email;
    const date = new Date(req.params.date);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Search for weather data for the specified date
    const weatherData = user.weatherData.find((data) => {
      return data.date.toDateString() === date.toDateString();
    });

    if (!weatherData) {
      return res.status(404).json({ success: false, error: 'Weather data not found for the date' });
    }

    res.status(200).json({ success: true, weatherData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Add your code for sending hourly weather reports here using cron and Nodemailer

module.exports = router;
