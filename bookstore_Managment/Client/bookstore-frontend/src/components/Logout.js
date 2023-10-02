import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem('token');
    // You can also perform any additional cleanup here if needed
    console.log('User logged out');
    navigate('/login'); // Redirect the user to the login page after logout
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
