import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"
import Footer from './Footer'; 

const Home = () => {
  return (
    <div>
      <div className='nav'>
      <a href="#footer">About</a>
      <a href="/login">Login</a>
      </div>
      <section>
        <h1>Welcome to VBook Store</h1>
        <p>Explore the world of books and discover the joy of reading!</p>
        <p>To view books please login</p>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
