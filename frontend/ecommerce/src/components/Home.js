import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate user login state

  const products = [
    { id: 1, name: "Smartphone Pro X", description: "A revolutionary smartphone with AI technology." },
    { id: 2, name: "Wireless Headphones", description: "Premium sound quality with noise cancellation." },
  ];

  return (
    <div>
      {/* Header */}
      <header className="text-white text-center py-4 shadow-lg" style={{ background: 'linear-gradient(90deg, #1e3c72, #2a5298)', fontFamily: 'Poppins, sans-serif' }}>
        <h1 className="fw-bold">Virtual Shopping Mall</h1>
        <p className="lead">Your Ultimate Online Shopping & Social Experience</p>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-dark py-2 shadow-sm text-center">
        <Link to="/" className="text-white mx-3 fw-semibold">Home</Link>
        <Link to="/products" className="text-white mx-3 fw-semibold">Products</Link>
        <Link to="/cart" className="text-white mx-3 fw-semibold">Cart</Link>
        <Link to="/social-feed" className="text-white mx-3 fw-semibold">Social Feed</Link>
        {isLoggedIn ? (
          <button className="btn btn-danger btn-sm mx-2" onClick={() => setIsLoggedIn(false)}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-light btn-sm mx-2">Login</Link>
            <Link to="/register" className="btn btn-warning btn-sm mx-2">Register</Link>
          </>
        )}
      </nav>

      <div className="container mt-5">
        <div className="row">
          {/* Conditionally Show User Profile */}
          {isLoggedIn && (
            <aside className="col-md-3 p-4 text-white rounded shadow-lg" style={{ background: 'linear-gradient(135deg, #283048, #859398)', fontFamily: 'Poppins, sans-serif' }}>
              <h4 className="fw-bold">User Profile</h4>
              <p>Welcome, User!</p>
              <hr className="border-light" />
              <h5 className="fw-bold">Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/orders" className="text-white">🛍 Orders</Link></li>
                <li><Link to="/wishlist" className="text-white">❤️ Wishlist</Link></li>
                <li><Link to="/settings" className="text-white">⚙ Settings</Link></li>
              </ul>
            </aside>
          )}

          <main className={`${isLoggedIn ? 'col-md-9' : 'col-md-12'} p-5 rounded shadow-lg`} style={{ background: 'linear-gradient(135deg, #eef2f3, #d9e8ec)', fontFamily: 'Poppins, sans-serif' }}>
            <h2 className="fw-bold text-dark">Welcome to the Virtual Shopping Mall</h2>
            <p className="lead text-muted">Experience seamless shopping with the best deals and social interactions!</p>

            <div className="mt-4">
              <h4 className="fw-bold text-primary">🌟 Featured Products</h4>
              <div className="d-flex gap-3 flex-wrap">
                {products.map(product => (
                  <div key={product.id} className="card border-0 shadow-sm" style={{ width: '18rem' }}>
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{product.name}</h5>
                      <p className="card-text text-muted">{product.description}</p>
                      <Link to={`/product-details/${product.id}`} className="btn btn-primary btn-sm">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white text-center py-3 mt-5 shadow-lg" style={{ background: 'linear-gradient(90deg, #1e3c72, #2a5298)', fontFamily: 'Poppins, sans-serif' }}>
        <p className="mb-0">&copy; 2025 Virtual Shopping Mall | All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
