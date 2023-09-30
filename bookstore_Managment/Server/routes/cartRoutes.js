const express = require('express');
const router = express.Router();

const ShoppingCart = require('../model/cart.model'); 

router.post('/add-cart', async (req, res) => {
  try {
    const userId = req.user._id; 
    const bookId = req.body.bookId; 
    const quantity = req.body.quantity || 1; 

    let shoppingCart = await ShoppingCart.findOne({ user: userId });
    if (!shoppingCart) {
      shoppingCart = new ShoppingCart({
        user: userId,
        items: [],
      });
    }
    const existingCartItem = shoppingCart.items.find((item) => item.book.equals(bookId));

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      shoppingCart.items.push({
        book: bookId,
        quantity: quantity,
      });
    }
    await shoppingCart.save();

    res.json({ message: 'Book added to the shopping cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/view-cart', async (req, res) => {
  try {
    const userId = req.user._id; 
    const shoppingCart = await ShoppingCart.findOne({ user: userId }).populate('items.book');
    res.json(shoppingCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
