import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateBook.css'
import { useParams } from 'react-router-dom';

function UpdateBook() {
  const [book, setBook] = useState({});
  const { bookId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    // Fetch the book details by its ID
    axios.get(`http://localhost:3000/books/${bookId}`)
      .then((response) => {
        setBook(response.data);
        setFormData({
          title: response.data.title,
          author: response.data.author,
          description: response.data.description,
          price: response.data.price,
        });
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
      });
  }, [bookId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the book
      const response = await axios.put(
        `http://localhost:3000/books/${bookId}`,
        formData
      );

      // Handle success (e.g., show a success message or redirect)
      console.log('Book updated:', response.data);
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Update Book</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateBook;
