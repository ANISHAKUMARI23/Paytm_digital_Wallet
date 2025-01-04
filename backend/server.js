const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  upi_id: { type: String, unique: true },
  balance: { type: Number },
});

// Create User model
const User = mongoose.model('User', userSchema);

// Define Transaction Schema
const transactionSchema = new mongoose.Schema({
  sender_upi_id: { type: String, required: true },
  receiver_upi_id: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Create Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

// Function to generate a unique UPI ID
const generateUPI = () => {
  const randomId = crypto.randomBytes(4).toString('hex'); // Generates a random 8-character ID
  return `${randomId}@fastpay`;
};

// SignUp Route
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'User already exists' });
    }

    // Generate UPI ID
    const upi_id = generateUPI();
    const balance = 1000;

    // Create new user
    user = new User({ name, email, password, upi_id, balance });
    await user.save();

    res.status(201).send({ message: 'User registered successfully!', upi_id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Fetch User Details Route
app.get('/api/user/:upi_id', async (req, res) => {
  try {
    const { upi_id } = req.params;

    const user = await User.findOne({ upi_id });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'An error occurred while fetching user details.' });
  }
});

const PORT = 5000; // Define a port for the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

