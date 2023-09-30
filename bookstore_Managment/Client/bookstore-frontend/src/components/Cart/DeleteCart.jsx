import React from 'react';
import './DeleteCartButton.css'; // Import your CSS file

const DeleteCartButton = () => {
  const handleDeleteCart = () => {
    // Make a DELETE request to the backend API to delete the cart
    fetch('http://localhost:3000/cart/delete-cart', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the success message or any further actions
        console.log(data.message);
      })
      .catch((error) => {
        console.error('Error deleting cart:', error);
      });
  };

  return (
    <div className="delete-cart-button">
      <button onClick={handleDeleteCart}>Delete Cart</button>
    </div>
  );
};

export default DeleteCartButton;
