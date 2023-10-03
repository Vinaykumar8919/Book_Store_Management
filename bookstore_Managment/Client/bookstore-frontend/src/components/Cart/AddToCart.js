import React, { useState } from 'react';


// Define a function to extract the user ID from a JWT toke
  

const AddToCart = (props) => {
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');
  
    const addToCart = async () => {
        try {
          const token1 = localStorage.getItem('token');
          console.log(token1);
          const {bookId} = props
      
          const response = await fetch('http://localhost:3000/cart/add-cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token1, // Include 'Bearer' before the token
            },
            body: JSON.stringify({ bookId, quantity }),
          });
      
          if (response.ok) {
            const data = await response.json();
            setMessage(data.message);
          } else {
            setMessage('Error adding to cart.');
          }
        } catch (error) {
          console.error('Error:', error);
          setMessage('Internal server error.');
        }
      };

  
    return (
      <div>
        <input style = {{width: '35px'}}
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={addToCart} style = {{color:'black'}}>Cart</button>
        <p>{message}</p>
      </div>
    );
  };
  
  export default AddToCart;
  