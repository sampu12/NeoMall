import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  
  const [mobileInput, setMobileInput] = useState('');
  const [editMobile, setEditMobile] = useState(false);
  const [mobileError, setMobileError] = useState('');

  const [addresses, setAddresses] = useState([]);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [newAddress, setNewAddress] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken) {
      navigate('/login');
      return;
    }

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
      .then(data => {
        setProfile(data);
        setMobileInput(data.mobile_number || '');
        setAddresses(data.addresses || []);
      })
      .catch(err => setError(err.message));
  }, [navigate]);

  const handleProfileUpdate = (updatedProfile) => {
    const sessionToken = localStorage.getItem('sessionToken');
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
        return response.text(); // Expecting only a success message from backend
      })
      .then(() => {
        setProfile(updatedProfile);
        setMobileInput(updatedProfile.mobile_number || '');
        setAddresses(updatedProfile.addresses || []);
      })
      .catch(err => alert(err.message));
  };

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    // Validate Indian mobile number: 10 digits starting with 6,7,8,9.
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobileInput.trim())) {
      setMobileError('Please enter a valid Indian mobile number (10 digits, starting with 6-9).');
      return;
    }
    const updatedProfile = { ...profile, mobile_number: mobileInput, addresses };
    handleProfileUpdate(updatedProfile);
    setEditMobile(false);
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [field]: value,
    };
    setAddresses(updatedAddresses);
  };

  const handleAddressSubmit = (index) => {
    const updatedProfile = { ...profile, mobile_number: mobileInput, addresses };
    handleProfileUpdate(updatedProfile);
    setEditingAddressIndex(null);
  };

  const handleSaveNewAddress = () => {
    if (!newAddress.addressLine1 || !newAddress.city || !newAddress.state || !newAddress.postalCode) {
      alert('Please fill in all required fields.');
      return;
    }
    const updatedProfile = { ...profile, addresses: [...addresses, newAddress] };
    handleProfileUpdate(updatedProfile);
    setNewAddress(null);
  };

  const handleDeleteAddress = (index) => {
    const updatedProfile = {
      ...profile,
      addresses: addresses.filter((_, i) => i !== index),
    };
    handleProfileUpdate(updatedProfile);
  };

  const handleAddNewAddress = () => {
    setNewAddress({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
    });
  };

  const handleCancelNewAddress = () => {
    setNewAddress(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">My Profile</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!profile ? (
        <div className="text-center mt-5">
          <h4>Loading Profile...</h4>
        </div>
      ) : (
        <div className="card shadow-sm p-4">
          <h4 className="fw-bold">{profile.name}</h4>
          <p><strong>Email:</strong> {profile.email}</p>

          <div className="mb-4">
            <strong>Mobile:</strong>{' '}
            {editMobile ? (
              <form onSubmit={handleMobileSubmit} className="d-flex flex-column align-items-start">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={mobileInput}
                  onChange={(e) => {
                    setMobileInput(e.target.value);
                    setMobileError('');
                  }}
                  placeholder="Enter new mobile number"
                />
                {mobileError && (
                  <div className="alert alert-danger py-1" style={{ fontSize: '0.8rem' }}>
                    {mobileError}
                  </div>
                )}
                <div>
                  <button type="submit" className="btn btn-success btn-sm me-2">Save</button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm ms-2"
                    onClick={() => setEditMobile(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <span>{profile.mobile_number || 'No mobile set'}</span>
                <button className="btn btn-primary btn-sm ms-2" onClick={() => setEditMobile(true)}>
                  Edit
                </button>
              </>
            )}
          </div>

          <div className="mb-4">
            <strong>Addresses:</strong>
            {addresses.map((address, index) => (
              <div key={index} className="mt-3">
                {editingAddressIndex === index ? (
                  <div>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Address Line 1"
                      value={address.addressLine1}
                      onChange={(e) => handleAddressChange(index, 'addressLine1', e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Address Line 2 (optional)"
                      value={address.addressLine2}
                      onChange={(e) => handleAddressChange(index, 'addressLine2', e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="State"
                      value={address.state}
                      onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Postal Code"
                      value={address.postalCode}
                      onChange={(e) => handleAddressChange(index, 'postalCode', e.target.value)}
                    />
                    <div className="d-flex">
                      <button onClick={() => handleAddressSubmit(index)} className="btn btn-success btn-sm me-2">Save</button>
                      <button onClick={() => setEditingAddressIndex(null)} className="btn btn-secondary btn-sm">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>{`${address.addressLine1}, ${address.city}, ${address.state}, ${address.postalCode}`}</p>
                    <button onClick={() => setEditingAddressIndex(index)} className="btn btn-primary btn-sm">Edit</button>
                    <button onClick={() => handleDeleteAddress(index)} className="btn btn-danger btn-sm">Delete</button>
                  </div>
                )}
              </div>
            ))}

            {newAddress ? (
              <div className="mt-3">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Address Line 1"
                  value={newAddress.addressLine1}
                  onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Address Line 2 (optional)"
                  value={newAddress.addressLine2}
                  onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Postal Code"
                  value={newAddress.postalCode}
                  onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                />
                <div className="d-flex">
                  <button onClick={handleSaveNewAddress} className="btn btn-success btn-sm me-2">Add</button>
                  <button onClick={handleCancelNewAddress} className="btn btn-secondary btn-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={handleAddNewAddress} className="btn btn-primary btn-sm mt-2">Add New Address</button>
            )}
          </div>
        </div>
      )}

      <Link to="/products" className="btn btn-secondary mt-4">Back to Products</Link>
    </div>
  );
};

export default Profile;
