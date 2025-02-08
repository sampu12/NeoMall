import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = ({ setCartCount }) => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [newAddress, setNewAddress] = useState(null);
  const [formData, setFormData] = useState({
    cardDetails: {
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');

    fetch('http://localhost:8989/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile.');
        }
        return response.json();
      })
      .then(data => setAddresses(data.addresses || []))
      .catch(err => alert('Failed to fetch addresses'));
  }, []);

  // --- Address Handlers ---
  const handleAddressSelection = (addressId) => {
    setSelectedAddressIndex(addressId);
    setNewAddress(null);
    setErrors(prev => ({ ...prev, address: '' }));
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateNewAddress = () => {
    const newErrors = {};
    if (!newAddress || !newAddress.addressLine1 || newAddress.addressLine1.trim().length < 3) {
      newErrors.addressLine1 = 'Address Line 1 must be at least 3 characters.';
    }
    if (!newAddress || !newAddress.city || !/^[A-Za-z\s]{2,30}$/.test(newAddress.city.trim())) {
      newErrors.city = 'City must be alphabets only (2-30 characters).';
    }
    if (!newAddress || !newAddress.state || !/^[A-Za-z\s]{2,30}$/.test(newAddress.state.trim())) {
      newErrors.state = 'State must be alphabets only (2-30 characters).';
    }
    if (!newAddress || !newAddress.postalCode || !/^\d{6}$/.test(newAddress.postalCode.trim())) {
      newErrors.postalCode = 'Postal Code must be exactly 6 digits.';
    }
    return newErrors;
  };

  const handleSaveNewAddress = () => {
    const addressErrors = validateNewAddress();
    if (Object.keys(addressErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...addressErrors }));
      return;
    }

    const sessionToken = localStorage.getItem('sessionToken');
    const updatedProfile = { addresses: [...addresses, newAddress] };

    fetch('http://localhost:8989/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(updatedProfile),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update profile.');
        }
        return response.text();
      })
      .then(() => {
        setAddresses(updatedProfile.addresses);
        setNewAddress(null);
        setErrors(prev => ({ ...prev, addressLine1: '', city: '', state: '', postalCode: '' }));
      })
      .catch(err => alert(err.message));
  };

  // --- Payment Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      cardDetails: {
        ...prevData.cardDetails,
        [name]: value,
      },
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validatePaymentDetails = () => {
    const newErrors = {};
    const { cardNumber, expiryDate, cvv } = formData.cardDetails;
    if (!cardNumber || !/^\d{16}$/.test(cardNumber.trim())) {
      newErrors.cardNumber = 'Card number must be exactly 16 digits.';
    }
    if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate.trim())) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format.';
    }
    if (!cvv || !/^\d{3,4}$/.test(cvv.trim())) {
      newErrors.cvv = 'CVV must be 3 or 4 digits.';
    }
    return newErrors;
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    const paymentErrors = validatePaymentDetails();
    let valid = Object.keys(paymentErrors).length === 0;

    // Validate that either an existing address or a new address is provided.
    // Additionally, if there are no addresses at all, that's an error.
    if ((addresses.length === 0 && !newAddress) || (selectedAddressIndex === null && !newAddress)) {
      valid = false;
      paymentErrors.address = 'Please select or add a delivery address.';
    }

    if (!valid) {
      setErrors(paymentErrors);
      return;
    }

    const sessionToken = localStorage.getItem('sessionToken');
    let addressId = null;
    if (selectedAddressIndex !== null) {
      const selectedAddress = addresses.find(address => address.addressId === selectedAddressIndex);
      if (!selectedAddress) {
        setErrors(prev => ({ ...prev, address: 'Invalid address selected.' }));
        return;
      }
      addressId = selectedAddress.addressId;
    }

    const paymentData = {
      addressId,
      cardDetails: formData.cardDetails,
    };

    setIsProcessing(true);

    fetch('http://localhost:8989/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(paymentData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Payment failed.');
        }
        return response.text();
      })
      .then(() => {
        alert('Order placed successfully!');
        // Reset cart count to zero after order placement.
        localStorage.setItem('cartCount', '0');
        setCartCount(0);
        navigate('/');
        setIsProcessing(false);
      })
      .catch(err => {
        alert(err.message);
        setIsProcessing(false);
      });
  };

  return (
    <div className="container mt-5">
      <h3 className="fw-bold text-dark text-center">Enter Payment and Delivery Details</h3>
      <form onSubmit={handlePaymentSubmit} className="mt-4">
        <h4 className="text-dark">Delivery Address</h4>
        {addresses.length > 0 ? (
          <div className="mb-4">
            {addresses.map((address) => (
              <div key={address.addressId} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="selectedAddress"
                  id={`address-${address.addressId}`}
                  onChange={() => handleAddressSelection(address.addressId)}
                  checked={selectedAddressIndex === address.addressId}
                />
                <label className="form-check-label" htmlFor={`address-${address.addressId}`}>
                  {`${address.addressLine1}, ${address.city}, ${address.state}, ${address.postalCode}`}
                </label>
              </div>
            ))}
            {errors.address && <div className="alert alert-danger py-1">{errors.address}</div>}
          </div>
        ) : (
          <>
            <p className="text-center text-danger">No addresses found. Please add a new address.</p>
            {errors.address && <div className="alert alert-danger py-1">{errors.address}</div>}
          </>
        )}

        {newAddress ? (
          <div className="mt-3">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Address Line 1"
              name="addressLine1"
              value={newAddress.addressLine1}
              onChange={handleNewAddressChange}
              required
            />
            {errors.addressLine1 && <div className="alert alert-danger py-1">{errors.addressLine1}</div>}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="City"
              name="city"
              value={newAddress.city}
              onChange={handleNewAddressChange}
              required
            />
            {errors.city && <div className="alert alert-danger py-1">{errors.city}</div>}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="State"
              name="state"
              value={newAddress.state}
              onChange={handleNewAddressChange}
              required
            />
            {errors.state && <div className="alert alert-danger py-1">{errors.state}</div>}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Postal Code"
              name="postalCode"
              value={newAddress.postalCode}
              onChange={handleNewAddressChange}
              required
            />
            {errors.postalCode && <div className="alert alert-danger py-1">{errors.postalCode}</div>}
            <div className="d-flex">
              <button type="button" onClick={handleSaveNewAddress} className="btn btn-success btn-sm me-2">
                Save Address
              </button>
              <button type="button" onClick={() => setNewAddress(null)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setNewAddress({ addressLine1: '', city: '', state: '', postalCode: '' })}
            className="btn btn-primary btn-sm mt-2"
          >
            Add New Address
          </button>
        )}

        <h4 className="text-dark mt-4">Payment Details</h4>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            className="form-control"
            value={formData.cardDetails.cardNumber}
            onChange={handleChange}
            required
          />
          {errors.cardNumber && <div className="alert alert-danger py-1">{errors.cardNumber}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="expiryDate" className="form-label">Expiry Date (MM/YY)</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            className="form-control"
            value={formData.cardDetails.expiryDate}
            onChange={handleChange}
            required
          />
          {errors.expiryDate && <div className="alert alert-danger py-1">{errors.expiryDate}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="cvv" className="form-label">CVV</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            className="form-control"
            value={formData.cardDetails.cvv}
            onChange={handleChange}
            required
          />
          {errors.cvv && <div className="alert alert-danger py-1">{errors.cvv}</div>}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
