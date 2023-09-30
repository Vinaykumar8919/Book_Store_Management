import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Correct import statements
import SignUp from './components/User/SignUp';
import Login from './components/User/Login';
import Home from './components/home';
import AddBook from './components/Books/AddBook';
import BookList from './components/Books/BookList';
import SingleBook from './components/Books/SingleBook';
import UpdateBook from './components/Books/UpdateBook';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/addbook' element={<AddBook />} />
          <Route path='/' element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path='/booksDetails' element={<BookList />} />
          <Route path='/getbook' element={<SingleBook />} />
          <Route path='/update-book/:bookId' element={<UpdateBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
