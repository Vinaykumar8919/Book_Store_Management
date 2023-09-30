const express = require('express');
const router = express.Router();

const Review = require('../model/review.model'); // Import the Review model


router.post('/', async (req, res) => {
  try {
    const { bookId, rating, feedback } = req.body;
    const userId = req.user._id; // Assuming you have user data in the request

    // Check if the user has already reviewed the same book
    const existingReview = await Review.findOne({ user: userId, book: bookId });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this book' });
    }

    const newReview = new Review({
      user: userId,
      book: bookId,
      rating,
      feedback,
      // Add any other review-related fields here
    });

    const savedReview = await newReview.save();

    res.json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get reviews for a specific book
router.get('/book/:bookId', async (req, res) => {
  try {
    const bookId = req.params.bookId;

    // Find all reviews for the specified book
    const reviews = await Review.find({ book: bookId });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get reviews by a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all reviews by the specified user
    const reviews = await Review.find({ user: userId });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a review by ID
router.put('/:reviewId', async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    const reviewId = req.params.reviewId;
    const userId = req.user._id; // Assuming you have user data in the request

    // Find the review by ID
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Ensure the user owns the review
    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'You are not authorized to update this review' });
    }

    // Update the review fields
    review.rating = rating;
    review.feedback = feedback;

    const updatedReview = await review.save();

    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a review by ID
router.delete('/:reviewId', async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.user._id; // Assuming you have user data in the request

    // Find the review by ID
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Ensure the user owns the review
    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'You are not authorized to delete this review' });
    }

    // Delete the review
    await review.remove();

    res.json({ message: 'Review deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
