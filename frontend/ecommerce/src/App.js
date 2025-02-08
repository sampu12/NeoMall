import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, NavLink, Navigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Home from './components/Home';
import Products from './components/Products';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Orders from './components/Orders';
import Wishlist from './components/Wishlist';
import Settings from './components/Settings';
import SocialFeed from './components/SocialFeed';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Payment from './components/Payment';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './components/Profile';

function Navbar({ isLoggedIn, setIsLoggedIn, cartCount }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('sessionToken');
      if (token) {
        await fetch('http://localhost:8989/auth/logout', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('userName');
      // Reset cart count when logging out.
      localStorage.setItem('cartCount', '0');
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">NeoMall</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "nav-link text-warning fw-bold" : "nav-link text-white"}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/products" 
                className={({ isActive }) => isActive ? "nav-link text-warning fw-bold" : "nav-link text-white"}
              >
                Products
              </NavLink>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink 
                  to="/cart" 
                  className={({ isActive }) => isActive ? "nav-link text-warning fw-bold" : "nav-link text-white"}
                >
                  🛒 Cart{' '}
                  <span className="badge bg-danger">{cartCount}</span>
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink 
                to="/social-feed" 
                className={({ isActive }) => isActive ? "nav-link text-warning fw-bold" : "nav-link text-white"}
              >
                Social Feed
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <DropdownButton
                id="profile-dropdown"
                title={userName}
                variant="light"
                className="ms-3"
              >
                <Dropdown.Item as={Link} to="/profile">👤 Profile</Dropdown.Item>
                <Dropdown.Item as={Link} to="/orders">🛍 Orders</Dropdown.Item>
                <Dropdown.Item as={Link} to="/wishlist">❤️ Wishlist</Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings">⚙ Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>🚪 Logout</Dropdown.Item>
              </DropdownButton>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm ms-3">Login</Link>
                <Link to="/register" className="btn btn-warning btn-sm ms-3">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Global cart count state
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    setIsLoggedIn(!!token);
    if (token) {
      // Fetch the current cart items to initialize the cart count.
      fetch('http://localhost:8989/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          const count = data.length;
          setCartCount(count);
          localStorage.setItem('cartCount', count.toString());
        })
        .catch(error => console.error('Error fetching cart count:', error));
    } else {
      setCartCount(0);
      localStorage.setItem('cartCount', '0');
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/products" element={<Products />} />
        <Route 
          path="/products/:categoryId/:productId" 
          element={<ProductDetails setCartCount={setCartCount} />} 
        />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={isLoggedIn ? <Cart setCartCount={setCartCount} /> : <Navigate to="/login" />} />
        <Route path="/payment" element={<Payment setCartCount={setCartCount} />} />
        <Route path="/social-feed" element={<SocialFeed />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
