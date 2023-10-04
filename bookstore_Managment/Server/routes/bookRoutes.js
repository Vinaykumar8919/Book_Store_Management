const express = require('express');
const router = express.Router();
const Book = require('../model/book.model');
const upload = require('../middleware/multerConfig') 


router.post('/addBook', upload.single('bookImage'),async (req, res) => {
  try {
    const { title, author, description, price } = req.body;
    const image = req.file ? req.file.filename : null;
    const newBook = new Book({
      title,
      author,
      description,
      price,
      image,
    });
    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error-----' });
  }
});


router.get('/all', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:bookId', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:bookId', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndRemove(req.params.bookId);

    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
