import React, { useState, useEffect } from 'react';
import './BookDetails.css'; // Import your CSS file
import { useParams } from 'react-router-dom';
import AddReview from '../Review/AddReview';
import EditReview from '../Review/EditReview';

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [viewReviews, setViewReviews] = useState(false);
  const [editingReview, setEditingReview] = useState(null); // Added state variable
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch(`http://localhost:3000/books/${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
        setLoading(false);
      });

    fetch(`http://localhost:3000/review/book/${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
        setLoadingReviews(false);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
        setLoadingReviews(false);
      });
  }, [bookId]);


  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!book) {
    return <div className="error">Book not found</div>;
  }

  return (
    <div className="book-details">
      <img
        src={`http://localhost:3000/upload/${book.image}`}
        alt={`Cover for ${book.title}`}
        className="book-cover"
      />
      <h1 className="book-title">{book.title}</h1>
      <p className="book-author">
        <strong>Author: </strong>
        {book.author}
      </p>
      <p className="book-description">{book.description}</p>
      
      <button onClick={() => setViewReviews(!viewReviews)}>
        {viewReviews ? 'Hide Reviews' : 'View Reviews'}
      </button>
      {viewReviews && (
        <>
          <h2>Reviews</h2>
          {loadingReviews ? (
            <p>Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p>No reviews available for this book.</p>
          ) : (
            <ul>
              {reviews.map((review) => (
                <li key={review._id}>
                  <p>Feedback: {review.feedback}</p>
                  <p>Rating: {review.rating}</p>
                  <button onClick={() => setEditingReview(review._id)}>
                    Edit
                  </button>
                  {editingReview === review._id && (
                    <EditReview review={review}  />
                  )}
                </li>
                
              ))}
            </ul>
            
          )}
        </>
        
      )}
      <AddReview bookId={book._id} />
    </div>
  );
};

export default BookDetails;
