const express = require('express');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

const router = express.Router();

// Get all transactions for a user
router.get('/:upiId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ $or: [{ senderUpi: req.params.upiId }, { receiverUpi: req.params.upiId }] });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new transaction
router.post('/', async (req, res) => {
  const { senderUpi, receiverUpi, amount } = req.body;
  try {
    const sender = await User.findOne({ upiId: senderUpi });
    const receiver = await User.findOne({ upiId: receiverUpi });

    if (!sender || !receiver) return res.status(400).json({ msg: 'Invalid UPI ID' });
    if (sender.balance < amount) return res.status(400).json({ msg: 'Insufficient balance' });

    sender.balance -= amount;
    receiver.balance += amount;
    await sender.save();
    await receiver.save();

    const transaction = new Transaction({ senderUpi, receiverUpi, amount });
    await transaction.save();

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;