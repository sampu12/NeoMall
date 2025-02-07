import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    fetch('http://localhost:8989/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders.');
        }
        return response.json();
      })
      .then(data => setOrders(data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div>
      {/* Orders Table */}
      <div className="container mt-5">
        <h2 className="fw-bold text-dark text-center">Your Orders</h2>

        {error ? (
          <p className="text-danger text-center mt-4">{error}</p>
        ) : (
          <div className="table-responsive mt-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.name}</td>
                      <td>{order.description}</td>
                      <td className="align-middle">
                        <Image src={`/images/${order.image}`} height="60" width="60" alt={order.name} fluid />
                      </td>
                      <td>{order.quantity}</td>
                      <td>{order.price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
