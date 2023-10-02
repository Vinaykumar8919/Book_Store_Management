import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Correct import statements
import SignUp from './components/User/SignUp';
import Login from './components/Login';
import Home from './components/home';
import AddBook from './components/Books/AddBook';
import BookList from './components/Books/BookList';
import SingleBook from './components/Books/SingleBook';
import UpdateBook from './components/Books/UpdateBook';
import AddToCart from './components/Cart/AddToCart';
import ViewCart from './components/Cart/ViewCart';
import DeleteCart from './components/Cart/DeleteCart';
function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
          <Route path='/addbook' element={<AddBook />} />
          <Route path='/' element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path='/booksDetails' element={<BookList />} />
          <Route path='/getbook' element={<SingleBook />} />
          <Route path='/update-book/:bookId' element={<UpdateBook />} />
          <Route path='/add-to-cart' element={<AddToCart />} />
          <Route path='/view-cart' element={<ViewCart /> } />
          <Route path='/delete-cart' element={<DeleteCart /> } />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
