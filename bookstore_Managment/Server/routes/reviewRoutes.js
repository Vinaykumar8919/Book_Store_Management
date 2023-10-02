const express = require('express');
const router = express.Router();

const Review = require('../model/review.model'); // Import the Review model


router.post('/', async (req, res) => {
  try {
    const { bookId, rating, feedback } = req.body;
    const userId = req.user._id; 
    const existingReview = await Review.findOne({ user: userId, book: bookId });
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this book' });
    }
    const newReview = new Review({
      user: userId,
      book: bookId,
      rating,
      feedback,
    });
    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/book/:bookId', async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const reviews = await Review.find({ book: bookId });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const reviews = await Review.find({ user: userId });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:reviewId', async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    const reviewId = req.params.reviewId;
    const userId = req.user._id; 
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'You are not authorized to update this review' });
    }

    review.rating = rating;
    review.feedback = feedback;
    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.delete('/:reviewId', async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.user._id; 
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'You are not authorized to delete this review' });
    }
    await review.remove();

    res.json({ message: 'Review deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
