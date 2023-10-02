import React, { Component } from 'react';
import { connect } from 'react-redux'; // If using Redux for state management
import axios from 'axios';

class RemoveFromCartButton extends Component {
  removeFromCart = async () => {
    try {
      const { bookId } = this.props;
      const userId = localStorage.getItem('token');
      
      // Send a DELETE request to the server to remove the book from the cart
      await axios.delete(`http://localhost:3000/cart/delete-book-from-cart/${userId}/${bookId}`);

      // Handle success (e.g., update your cart state if using Redux)
      // Example using Redux dispatch:
      // this.props.removeFromCart(bookId);

      console.log('Book removed from cart successfully');
    } catch (error) {
      console.error('Error removing book from cart:', error);
    }
  };

  render() {
    return (
      <button onClick={this.removeFromCart}>Remove from Cart</button>
    );
  }
}

export default RemoveFromCartButton;
