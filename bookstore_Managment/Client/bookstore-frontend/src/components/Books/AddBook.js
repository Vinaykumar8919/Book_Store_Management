import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const [bookInfo, setBookInfo] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
  });
  const [bookImage, setBookImage] = useState(null); 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookInfo({
      ...bookInfo,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBookImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', bookInfo.title);
      formData.append('author', bookInfo.author);
      formData.append('description', bookInfo.description);
      formData.append('price', bookInfo.price);
      formData.append('bookImage', bookImage); 

      const response = await axios.post('http://localhost:3000/books/addBook', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      console.log('Book added:', response.data);
      alert("bookAddedSuccesfully")
      setBookInfo({
        title: '',
        author: '',
        description: '',
        price: '',
      });
      // Clear the bookImage state
      setBookImage(null);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <h2>Add a Book</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookInfo.title}
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
            value={bookInfo.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={bookInfo.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={bookInfo.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bookImage">Book Image:</label>
          <input
            type="file"
            id="bookImage"
            name="bookImage"
            accept="image/*"
            onChange={handleImageChange} // Handle image selection
            required
          />
        </div>
        <div>
          <button type="submit">Add Book</button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
