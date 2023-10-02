import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './BookList.css';
import AddToCart from '../Cart/AddToCart';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/books/all')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);

    return (
    <div>
      <h2>All Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Price: {book.price}</p>
            <AddToCart bookId={book._id} />
            <img
              src={`http://localhost:3000/upload/${book.image}`} 
              alt={`Cover for ${book.title}`}
              className="book-cover" 
            />
            <div>
              {/* Link to the UpdateBook component with the book's ID */}
              <Link to={`/getbook/${book._id}`}>
                <button className="update-button">View</button>
              </Link>
              <AddToCart bookId={book._id} />
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
