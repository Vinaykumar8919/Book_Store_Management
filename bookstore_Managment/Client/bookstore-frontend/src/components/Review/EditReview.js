import React, { useState } from 'react';
function EditReview({ review }) {
    const [rating, setRating] = useState(review.rating);
    const [feedback, setFeedback] = useState(review.feedback);
    const [error, setError] = useState(null);
  
    const handleRatingChange = (event) => {
      setRating(parseInt(event.target.value));
    };
  
    const handleFeedbackChange = (event) => {
      setFeedback(event.target.value);
    };
    const token = localStorage.getItem('token');
    const handleSave = async ({review_id}) => {
      // Make a PUT request to update the review with the new rating and feedback
      try {
        const response = await fetch(`http://localhost:3000/review/${review._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Include the authentication token if needed
             'Authorization': token,
          },
          body: JSON.stringify({
            rating,
            feedback,
          }),
        });
  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }
  
      } catch (error) {
        setError(error.message);
      }
    };
  
    return (
      <div>
        {error && <div className="error">{error}</div>}
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
        <button onClick={handleSave}>Save</button>
      </div>
    );
  }
  export default EditReview;