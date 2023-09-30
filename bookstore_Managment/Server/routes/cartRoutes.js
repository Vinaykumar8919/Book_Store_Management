const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const Book = require('../model/book.model');

const ShoppingCart = require('../model/cart.model'); 

router.post('/add-cart', auth, async (req, res) => {
  try {
    const userId = req.user.userId; 
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
      // If the book doesn't exist in the cart, add a new item
      const book = await Book.findById(bookId); // Assuming 'Book' is the model for books
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      shoppingCart.items.push({
        book: bookId,
        quantity: quantity,
      });
    }
    shoppingCart.totalPrice = shoppingCart.items.reduce((total, item) => {
      const bookPrice = item.book.price; // Assuming 'Book' has a 'price' field
      return total + bookPrice * item.quantity;
    }, 0);


    await shoppingCart.save();

    res.json({ message: 'Book added to the shopping cart' });
  } catch (error) {
    console.error(error, "----------");
    res.status(500).json({ error: 'Internal server error-------' });
  }
});

router.get('/view-cart', auth,async (req, res) => {
  try {
    const userId = req.user.userId; 
    const shoppingCart = await ShoppingCart.findOne({ user: userId }).populate('items');
    res.json(shoppingCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete-cart', auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find and delete the shopping cart for the user
    await ShoppingCart.findOneAndRemove({ user: userId });

    res.json({ message: 'Shopping cart deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
