const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const auth = require('../middleware/auth'); 
const ShoppingCart = require('../model/cart.model');


router.post('/signup', async (req, res) => {
  try {
    const { email, password, name,profilePicture } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      name,
    });
    await user.save();
    res.status(201).json({user});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ _id: user._id }, 'Vinay@#23', { expiresIn: '5h' });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/get-all-users',  async (req, res) => {
    try {
      const user = await User.find(); 
      if (user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({user});
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });



module.exports = router;
