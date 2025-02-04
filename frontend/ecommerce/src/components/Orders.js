import React from 'react';
import { Link } from 'react-router-dom';

const orders = [
  { id: 1, productName: "Wireless Headphones", quantity: 1, status: "Delivered" },
  { id: 2, productName: "Smartphone Case", quantity: 2, status: "Shipped" },
  { id: 3, productName: "Smartwatch", quantity: 1, status: "Processing" },
  { id: 4, productName: "Laptop Bag", quantity: 1, status: "Delivered" }
];

const Orders = () => {
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

      {/* Orders Table */}
      <div className="container mt-5">
        <h2 className="fw-bold text-dark text-center">Your Orders</h2>
        <div className="table-responsive mt-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white text-center py-3 mt-5 shadow-lg" style={{ background: 'linear-gradient(90deg, #1e3c72, #2a5298)' }}>
        <p className="mb-0">&copy; 2025 Virtual Shopping Mall | All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Orders;
