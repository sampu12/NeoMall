import React from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
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
        <Link to="/wishlist" className="text-white mx-3 fw-semibold">Wishlist</Link>
        <Link to="/settings" className="text-warning mx-3 fw-semibold">Settings</Link>
      </nav>

      {/* Settings Options */}
      <div className="container mt-5">
        <h2 className="fw-bold text-dark text-center">Account Settings</h2>
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="settings-option p-3 border shadow-sm">
              <h3>Change Password</h3>
              <p>Update your account password.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="settings-option p-3 border shadow-sm">
              <h3>Notification Preferences</h3>
              <p>Manage your email and push notifications.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="settings-option p-3 border shadow-sm">
              <h3>Privacy Settings</h3>
              <p>Control your privacy preferences and data.</p>
            </div>
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

export default Settings;
