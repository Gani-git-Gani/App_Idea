const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define a User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// Create User model
const User = mongoose.model('User', userSchema);

// Define a Restaurant schema
const restaurantSchema = new mongoose.Schema({
    name: String,
    location: String,
    rating: Number,
    menu: [String],
});

// Create Restaurant model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// Routes to handle API requests
app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Save a user
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).send('Error saving user');
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});