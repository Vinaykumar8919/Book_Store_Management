const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  price: {
    type:Number,
    required: true,
  },
  image: {
    type: String, // You can store the filename or the image URL here
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
