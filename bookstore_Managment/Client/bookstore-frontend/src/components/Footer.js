import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer
        className='footer'
        id='footer'
        style={{
          display: 'flex',
          justifyContent: 'center', 
          height:'100px',
          alignItems: 'center', 
          backgroundColor: '#333', 
          color: 'white', 
          padding: '10px', 
          width:'100%',
        }}
      >
        &copy;  Vinay Kumar | Made with ❤️ by HeroVired | <br></br>
        <p>Contact: <a href="mailto:vinaykumar891940@gmail.com">📧</a></p>
      </footer>
    </div>
  );
};

export default Footer;
