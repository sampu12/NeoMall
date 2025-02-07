import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Use an object to hold errors for each field
  const [errorMessage, setErrorMessage] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear any previous error for this field
    setErrorMessage((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  // Validation regular expressions
  const nameRegex = /^[A-Za-z\s]+$/; // Only alphabets and spaces
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
  // Explanation:
  // - (?=.*[a-z])      : at least one lowercase letter
  // - (?=.*[A-Z])      : at least one uppercase letter
  // - (?=.*\d)         : at least one digit
  // - (?=.*[\W_])      : at least one special character
  // - .{8,20}          : length between 8 and 20 characters

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const errors = {};

    // Validate Name
    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
      valid = false;
    } else if (!nameRegex.test(formData.name)) {
      errors.name = 'Name must contain only alphabets and spaces.';
      valid = false;
    } else if (formData.name.length < 3) {
      errors.name = 'Name must be at least 3 characters long.';
      valid = false;
    } else if (formData.name.length > 30) {
      errors.name = 'Name cannot exceed 30 characters.';
      valid = false;
    }

    // Validate Email
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
      valid = false;
    } else if (formData.email.length < 5) {
      errors.email = 'Email must be at least 5 characters long.';
      valid = false;
    } else if (formData.email.length > 50) {
      errors.email = 'Email cannot exceed 50 characters.';
      valid = false;
    }

    // Validate Password
    if (!formData.password) {
      errors.password = 'Password is required.';
      valid = false;
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        'Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.';
      valid = false;
    }

    // Validate Confirm Password
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }

    setErrorMessage(errors);

    // If validation passes, proceed with registration
    if (valid) {
      try {
        const response = await fetch('http://localhost:8989/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
          }),
        });

        if (response.ok) {
          console.log('Registration successful');
          navigate('/login'); // Redirect to login page
        } else {
          const errorData = await response.json();
          console.error('Registration failed:', errorData.message);
          setErrorMessage({ general: errorData.message || 'Registration failed' });
        }
      } catch (error) {
        console.error('Error during registration:', error);
        setErrorMessage({ general: 'Server error. Please try again later.' });
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errorMessage.name && (
              <div className="alert alert-danger py-1">{errorMessage.name}</div>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errorMessage.email && (
              <div className="alert alert-danger py-1">{errorMessage.email}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a strong password"
            />
            {errorMessage.password && (
              <div className="alert alert-danger py-1">{errorMessage.password}</div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
            />
            {errorMessage.confirmPassword && (
              <div className="alert alert-danger py-1">{errorMessage.confirmPassword}</div>
            )}
          </div>

          {/* General Error Message */}
          {errorMessage.general && (
            <div className="alert alert-danger py-1">{errorMessage.general}</div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
