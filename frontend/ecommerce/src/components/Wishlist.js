import React from 'react';
import { Link } from 'react-router-dom';

const wishlist = [
  { id: 1, name: "Wireless Headphones", price: "$99.99", img: "https://via.placeholder.com/200" },
  { id: 2, name: "Smartphone Case", price: "$19.99", img: "https://via.placeholder.com/200" }
];

const Wishlist = () => {
  return (
    <div>
      {/* Header */}
      <header className="text-white text-center py-4 shadow-lg" style={{ background: 'linear-gradient(90deg, #1e3c72, #2a5298)' }}>
      <h1 className="fw-bold">Virtual Shopping Mall</h1>
      <p className="lead">Your Ultimate Online Shopping & Social Experience</p>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-dark py-2 shadow-sm text-center">
        <Link to="/" className="text-white mx-3 fw-semibold">Home</Link>
        <Link to="/products" className="text-white mx-3 fw-semibold">Products</Link>
        <Link to="/cart" className="text-white mx-3 fw-semibold">Cart</Link>
        <Link to="/social-feed" className="text-white mx-3 fw-semibold">Social Feed</Link>
        <Link to="/wishlist" className="text-warning mx-3 fw-semibold">Wishlist</Link>
        <Link to="/settings" className="text-white mx-3 fw-semibold">Settings</Link>
      </nav>

      {/* Wishlist Items */}
      <div className="container mt-5">
        <h2 className="fw-bold text-dark text-center">Your Saved Products</h2>
        <div className="row mt-4">
          {wishlist.map(item => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="wishlist-item p-3 border shadow-sm">
                <img src={item.img} alt={item.name} className="img-fluid" />
                <h3 className="mt-3">{item.name}</h3>
                <p className="text-muted">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white text-center py-3 mt-5 shadow-lg" style={{ background: 'linear-gradient(90deg, #1e3c72, #2a5298)' }}>
        <p className="mb-0">&copy; 2025 Virtual Shopping Mall | All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Wishlist;
