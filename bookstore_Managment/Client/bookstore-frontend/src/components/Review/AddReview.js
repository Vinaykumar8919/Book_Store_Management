import React, { useState } from 'react';

function AddReview({ bookId }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState(null);


  const token = localStorage.getItem('token');
  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        console.log(token);
      const response = await fetch('http://localhost:3000/review/add-review', {
        method: 'POST',
        
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, 
        },
        body: JSON.stringify({
          bookId,
          rating,
          feedback,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      setRating(0);
      setFeedback('');
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Add a Review</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            min="1"
            max="5"
          />
        </div>
        <div>
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            value={feedback}
            onChange={handleFeedbackChange}
            rows="4"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddReview;
