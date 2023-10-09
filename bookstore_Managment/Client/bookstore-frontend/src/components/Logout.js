import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('token');
  
    console.log('User logged out');
    navigate('/'); 
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
