const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String, 
    },

    shoppingCart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShoppingCart',
    }
  }
);

module.exports = mongoose.model('User', userSchema);
