import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './AllBooks.css';
import AddToCart from '../Cart/AddToCart';
import Footer from '../Footer';
import Logout from '../Logout'
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
      <div className='container'>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Price: {book.price}</p>
            
            <Link to={`/getbook/${book._id}`}>
              <img 
                src={`http://localhost:3000/upload/${book.image}`} 
                alt={`Cover for ${book.title}`}
                className="book-cover" 
              />
            </Link>
            <div>
              <AddToCart bookId={book._id} /> 
            </div>
          </li>
        ))}
      </ul>
      </div>
      <Logout/>
      <Footer />
    </div>
  );
}

export default BookList;
