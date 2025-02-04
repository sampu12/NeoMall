import React from 'react';
import { Link } from 'react-router-dom';

const SocialFeed = () => {
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
        <Link to="/social-feed" className="text-warning mx-3 fw-semibold">Social Feed</Link>
      </nav>

      {/* Social Feed Content */}
      <div className="container mt-5">
        <h2 className="fw-bold text-dark text-center">Latest Posts</h2>
        <div className="mt-4">
          {/* Post 1 */}
          <div className="post p-3 mb-4 border shadow-sm bg-white">
            <p><strong>User1:</strong> Just bought amazing wireless headphones!</p>
          </div>
          
          {/* Post 2 */}
          <div className="post p-3 mb-4 border shadow-sm bg-white">
            <p><strong>User2:</strong> Anyone tried the new smartphone case?</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white text-center py-3 mt-5 shadow-lg" style={{ background: 'linear-gradient(90deg, #1e3c72, #2a5298)' }}>
        <p className="mb-0">&copy; 2025 Virtual Shopping Mall | All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default SocialFeed;
