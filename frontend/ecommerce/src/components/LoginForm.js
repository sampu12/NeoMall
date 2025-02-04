import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in both fields.');
    } else {
      setErrorMessage('');
      console.log('Logging in with', email, password);
      // Simulating login success
      navigate('/'); // Redirect to Home page after successful login
    }
  };

  return (
    <div>
      <header className="text-white text-center py-4 shadow-lg" style={{ background: 'linear-gradient(90deg, #1e3c72, #2a5298)' }}>
        <h1 className="fw-bold">Virtual Shopping Mall</h1>
        <p className="lead">Your Ultimate Online Shopping & Social Experience</p>
      </header>

      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-sm" style={{ width: '350px' }}>
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            {errorMessage && <div className="alert alert-danger py-1">{errorMessage}</div>}
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/register">Register Here</Link>
          </p>
        </div>
      </div>

      <footer className="text-white text-center py-3 shadow-lg" style={{ background: 'linear-gradient(90deg, #1e3c72, #2a5298)' }}>
        <p className="mb-0">&copy; 2025 Virtual Shopping Mall | All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LoginForm;
