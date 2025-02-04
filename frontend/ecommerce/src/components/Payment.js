import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Payment = () => {
  const [formData, setFormData] = useState({
    deliveryAddress: {
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: ''
    },
    cardDetails: {
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle changes for delivery address and card details
  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    const section = dataset.section; // 'deliveryAddress' or 'cardDetails'
    
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [name]: value
      }
    }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      alert('Payment and Delivery Address Submitted Successfully!');
      setIsProcessing(false);
    }, 2000); // Simulate 2 seconds delay for payment processing
  };

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
      </nav>

      {/* Payment Content */}
      <div className="container mt-5">
        <h3 className="fw-bold text-dark text-center">Enter Payment and Delivery Details</h3>
        <form onSubmit={handlePaymentSubmit} className="mt-4">
          
          {/* Delivery Address Section */}
          <h4 className="text-dark">Delivery Address</h4>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              data-section="deliveryAddress"
              className="form-control"
              value={formData.deliveryAddress.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="addressLine1" className="form-label">Address Line 1</label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              data-section="deliveryAddress"
              className="form-control"
              value={formData.deliveryAddress.addressLine1}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="addressLine2" className="form-label">Address Line 2 (Optional)</label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              data-section="deliveryAddress"
              className="form-control"
              value={formData.deliveryAddress.addressLine2}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input
              type="text"
              id="city"
              name="city"
              data-section="deliveryAddress"
              className="form-control"
              value={formData.deliveryAddress.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">State</label>
            <input
              type="text"
              id="state"
              name="state"
              data-section="deliveryAddress"
              className="form-control"
              value={formData.deliveryAddress.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="postalCode" className="form-label">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              data-section="deliveryAddress"
              className="form-control"
              value={formData.deliveryAddress.postalCode}
              onChange={handleChange}
              required
            />
          </div>

          {/* Payment Details Section */}
          <h4 className="text-dark mt-4">Payment Details</h4>
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              data-section="cardDetails"
              className="form-control"
              value={formData.cardDetails.cardNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              data-section="cardDetails"
              className="form-control"
              value={formData.cardDetails.expiryDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cvv" className="form-label">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              data-section="cardDetails"
              className="form-control"
              value={formData.cardDetails.cvv}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="text-white text-center py-3 mt-5 shadow-lg" style={{ background: 'linear-gradient(90deg, #1e3c72, #2a5298)' }}>
        <p className="mb-0">&copy; 2025 Virtual Shopping Mall | All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Payment;
