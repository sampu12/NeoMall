import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Image, Container, Row, Col, Alert } from 'react-bootstrap';

const Cart = ({ setCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items on mount
  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:8989/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        return response.json();
      })
      .then(data => {
        setCartItems(data);
        setCartCount(data.length); // Update the global cart count
      })
      .catch(error => console.error('Error fetching cart items:', error));
  }, [navigate, setCartCount]);

  // Utility function to update the global cart count by re-fetching cart data
  const updateCartCount = (sessionToken) => {
    fetch('http://localhost:8989/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setCartCount(data.length);
      })
      .catch(error => console.error('Error updating cart count:', error));
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const sessionToken = localStorage.getItem('sessionToken');
    fetch(`http://localhost:8989/cart/update-quantity`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
      },
      body: JSON.stringify({ productId: itemId, quantity: newQuantity }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update product quantity');
        }
        return response.text();
      })
      .then(() => {
        setCartItems(prevItems =>
          prevItems.map(item =>
            // Ensure proper comparison—if productId is an object, you may need to compare a specific field.
            item.productId === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
        updateCartCount(sessionToken);
      })
      .catch(error => console.error('Error updating quantity:', error));
  };

  const handleDeleteItem = itemId => {
    const sessionToken = localStorage.getItem('sessionToken');
    fetch(`http://localhost:8989/cart/remove?categoryId=${itemId.categoryId}&productId=${itemId.productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
      },
    })
      .then(() => {
        setCartItems(prevItems => prevItems.filter(item => item.productId !== itemId));
        // Re-fetch cart data to update the global counter
        updateCartCount(sessionToken);
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  const handlePaymentClick = () => {
    navigate('/payment');
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center fw-bold text-dark">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <Alert variant="warning" className="text-center mt-4">
          Your cart is empty.
        </Alert>
      ) : (
        <>
          <Table responsive bordered hover className="mt-4">
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.productId.categoryId + "-" + item.productId.productId}>
                  <td className="align-middle">{item.name}</td>
                  <td className="align-middle">
                    <Image src={`/images/${item.image}`} height="60" width="60" alt={item.name} fluid />
                  </td>
                  <td className="align-middle">
                    <Row className="align-items-center">
                      <Col xs="auto">
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => updateItemQuantity(item.productId, item.quantity - 1)}
                        >
                          -
                        </Button>
                      </Col>
                      <Col xs="auto">
                        <span className="fw-bold">{item.quantity}</span>
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => updateItemQuantity(item.productId, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </Col>
                    </Row>
                  </td>
                  <td className="align-middle">${item.price.toFixed(2)}</td>
                  <td className="align-middle">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="align-middle">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteItem(item.productId)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4 className="fw-bold">Total: ${calculateTotal()}</h4>
            <Button variant="success" onClick={handlePaymentClick}>
              Place Order
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
