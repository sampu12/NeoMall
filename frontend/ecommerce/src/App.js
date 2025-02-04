import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/social-feed" element={<SocialFeed />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
