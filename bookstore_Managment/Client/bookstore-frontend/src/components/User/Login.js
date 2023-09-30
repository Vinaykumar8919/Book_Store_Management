
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // You can add a link to the sign-up page
import './login.css'
import { useNavigate } from 'react-router-dom';
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Check if the formData is correctly populated
    axios.post('http://localhost:3000/user/login', formData)
      .then((response) => {
        console.log('User logged in successfully:');
        alert('Login successful');
        navigate("/")
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        alert('Invalid credentials');
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
