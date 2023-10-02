import React, { useState, useEffect } from 'react';
import './BookDetails.css'; // Import your CSS file
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make a GET request to retrieve book details based on the bookId
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
  }, [bookId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!book) {
    return <div className="error">Book not found</div>;
  }

  return (
    <div className="book-details">
    <img src={`http://localhost:3000/upload/${book.image}`} 
              alt={`Cover for ${book.title}`}
              className="book-cover"  />
      <h1 className="book-title">{book.title}</h1>
      <p className="book-author"><strong>Author: </strong>{book.author}</p>
      <p className="book-description">{book.description}</p>
      <p>feedback</p>
      <p>rating</p>
    </div>
  );
};

export default BookDetails;
