import './Styles.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp(props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profile: '', // Initialize profile as an empty string for the file path
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // If the input is a file input (profile image), get the file path
    if (type === 'file' && files.length > 0) {
      const filePath = URL.createObjectURL(files[0]);
      setFormData({
        ...formData,
        [name]: filePath,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
          <label htmlFor="image">Profile Image:</label>
          <input
            type="file"
            id="image"
            name="profile"
            accept="image/*"
            onChange={handleChange}
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
