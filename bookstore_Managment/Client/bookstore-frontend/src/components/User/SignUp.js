import './Styles.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp(props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
   // Initialize profile as an empty string for the file path
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value, type } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Check if the formData is correctly populated
    axios.post('http://localhost:3000/user/signup', formData)
      .then((response) => {
        console.log('User registered successfully:');
        alert('Successfully added');
        navigate('/login');
      })
      .catch((error) => {
        console.error( error);
        alert("Email is aleredy registerd try with another");
      });
  };


  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
