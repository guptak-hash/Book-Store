// File: src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';

const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { totalQuantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
    dispatch(clearCart());
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">Book Store</Link>
        
        <div className="navbar-links">
          {isAuthenticated && (
            <span className="navbar-user">Welcome, {currentUser.email}</span>
          )}
          
          <Link to="/">Home</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="cart-icon">
                Cart
                {totalQuantity > 0 && (
                  <span className="cart-count">{totalQuantity}</span>
                )}
              </Link>
              <button onClick={handleLogout} className="btn btn-small">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-small">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;