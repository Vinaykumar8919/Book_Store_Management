import React, { useState, useEffect } from 'react';


const ViewCart = () => {
  const [cart, setCart] = useState([[]]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/cart/view-cart', {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Cache-Control': 'no-cache',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCart(data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      });
  }, []);
  const handleDeleteBook = async (props) => {
    try {
      const userToken = localStorage.getItem('token');
      console.log(userToken);
      const bookId = props;
      const response = await fetch(`http://localhost:3000/cart/delete/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': userToken,
          'Cache-Control': 'no-cache',
        },
      });
      if (response.status === 200) {
        console.log('Book deleted from cart successfully');
      } else {
        console.error('Error deleting book from cart:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting book from cart:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="view-cart">
      <h1 className="cart-header">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li className="cart-item" key={index}>
              <div className="book-details">
              <img
              src={`http://localhost:3000/upload/${item.book.image}`} 
              alt={`Cover for ${item.book.title}`}
              className="book-cover" 
            />
                <div className="book-info">
                  <p><strong>Book: </strong>{item.book.title}</p>
                  <p><strong>Author: </strong>{item.book.author}</p>
                  <p><strong>Quantity: </strong>{item.quantity}</p>
                  <button onClick={() => handleDeleteBook(item.book._id)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewCart;
