import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleBook() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch a single book by its ID
    axios.get(`/books/${bookId}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error('Error fetching book:', error);
      });
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <p>Price: ${book.price}</p>
      {/* Add more book details here */}
    </div>
  );
}

export default SingleBook;
