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
        <h2>Features of Reading Books</h2>
        <ul>
          <p>Expand your knowledge and imagination.</p>
          <p>Experience the joy of storytelling.</p>
          <p>Escape to different worlds and cultures.</p>
          <p>Improve your vocabulary and language skills.</p>
          <p>Enhance your focus and concentration.</p>
        </ul>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
