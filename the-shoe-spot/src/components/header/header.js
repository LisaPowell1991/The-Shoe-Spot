import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/images/logo.png';
import './header.css';
import '../../App.css';

const NavLinkItem = ({ to, onClick, children }) => {
  const getClassName = ({ isActive }) => (isActive ? 'active' : '');
  return (
    <li>
      <NavLink to={to} className={getClassName} onClick={onClick}>
        {children}
      </NavLink>
    </li>
  );
};

const AuthButtons = ({ user, handleShowLogin, handleShowSignup, handleLogout }) => {
  return (
    <div className="auth-buttons">
      {!user && (
        <>
          <button className="custom-button me-2" onClick={handleShowLogin}>Login</button>
          <button className="custom-button-secondary" onClick={handleShowSignup}>Signup</button>
        </>
      )}
      {user && (
        <button className="custom-button me-2" onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

const Headers = ({ user, handleShowLogin, handleShowSignup, handleLogout, cartItemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOpenState = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-container">
      <div className="logo">
        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
          <img src={Logo} alt="Logo" />
        </NavLink>
        <h6>The Shoe Spot</h6>
      </div>
      <nav className={`links ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <NavLinkItem to="/" onClick={toggleMenuOpenState}>Home</NavLinkItem>
          <NavLinkItem to="/about" onClick={toggleMenuOpenState}>About</NavLinkItem>
          <NavLinkItem to="/products" onClick={toggleMenuOpenState}>Products</NavLinkItem>
          <NavLinkItem to="/contact" onClick={toggleMenuOpenState}>Contact</NavLinkItem>
          <NavLinkItem to="/cart" onClick={toggleMenuOpenState}>
            Cart <FontAwesomeIcon icon={faShoppingBag} size="lg" />
            {cartItemCount > 0 && <span className="badge bg-primary badge-sm">{cartItemCount}</span>}
          </NavLinkItem>
        </ul>
      </nav>
      <AuthButtons user={user} handleShowLogin={handleShowLogin} handleShowSignup={handleShowSignup} handleLogout={handleLogout} />
      <button className="hamburger" onClick={toggleMenuOpenState}>
        {isMenuOpen ? '×' : '☰'}
      </button>
    </header>
  );
}

export default Headers;