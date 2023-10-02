import React, { useState, useEffect } from 'react';
import './ViewCart.css'; // Import the CSS file
import DeleteCartButton from './DeleteCart';

const ViewCart = () => {
  const [cart, setCart] = useState([[]]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make a GET request to retrieve the shopping cart data
    fetch('http://localhost:3000/cart/view-cart', {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Cache-Control': 'no-cache',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items);
        setCart(data.items); // Assuming 'data.items' contains cart items
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      });
  }, []);

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
                  src={item.book} // Assuming you have an imageURL field in your book object
                  alt={item.book}
                  className="book-image"
                />
                <div className="book-info">
                  <p><strong>Book: </strong>{item.book}</p>
                  <p><strong>Author: </strong>{item.book}</p>
                  <p><strong>Quantity: </strong>{item.quantity}</p>
                  <DeleteCartButton
                    bookId={item.book}/>
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
