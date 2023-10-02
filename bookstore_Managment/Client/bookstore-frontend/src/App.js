import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';// Correct import statements
import SignUp from './components/User/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import AddBook from './components/Books/AddBook';
import BookList from './components/Books/BookList';
import UpdateBook from './components/Books/UpdateBook';
import AddToCart from './components/Cart/AddToCart';
import ViewCart from './components/Cart/ViewCart';
import BookDetails from './components/Books/BookDetails';
import AllBook from './components/Books/AllBook'
import Logout from './components/Logout';
import AddReview from './components/Review/AddReview';
import EditReview from './components/Review/EditReview';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path='/addbook' element={<AddBook />} />
          <Route path='/' element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path='/get-all-books-admin' element={<BookList />} />
          <Route path='/get-all-books' element={<AllBook />} />
          <Route path='/getbook/:bookId' element={<BookDetails />} />
          <Route path='/update-book/:bookId' element={<UpdateBook />} />
          <Route path='/add-to-cart' element={<AddToCart />} />
          <Route path='/view-cart' element={<ViewCart /> } />
          <Route path='/logout' element={<Logout /> } />
          <Route path='/add-review' element={<AddReview /> } />
          </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
