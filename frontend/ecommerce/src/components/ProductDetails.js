import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ProductDetails = ({ setCartCount }) => {
  const { categoryId, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8989/products/${categoryId}/${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then(data => setProduct(data))
      .catch(error => setError(error.message));
  }, [categoryId, productId]);

  const updateCartCount = (sessionToken) => {
    fetch('http://localhost:8989/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch cart details');
        }
        return response.json();
      })
      .then(cartData => {
        setCartCount(cartData.length);
        localStorage.setItem('cartCount', cartData.length.toString());
      })
      .catch(err => console.error('Error updating cart count:', err));
  };

  const handleAddToCart = () => {
    const sessionToken = localStorage.getItem('sessionToken');

    if (!sessionToken) {
      alert('Please log in to add products to your cart.');
      navigate('/login', { state: { from: `/products/${categoryId}/${productId}` } });
    } else {
      fetch('http://localhost:8989/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          productId: {
            productId: productId,
            categoryId: categoryId
          },
          quantity: 1,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add product to cart');
          }
          return response.json();
        })
        .then(() => {
          alert(`${product.name} has been successfully added to your cart.`);
          updateCartCount(sessionToken);
        })
        .catch(error => {
          alert(`Error: ${error.message}`);
        });
    }
  };

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <p className="text-danger fw-bold">{error}</p>
        <Link to="/products" className="btn btn-secondary">Back to Products</Link>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center mt-5">Loading product details...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card border-0 shadow-lg p-4">
        <div className="row">
          <div className="col-md-6">
            <img 
              src={`/images/${product.image}`} 
              className="img-fluid rounded shadow-sm" 
              style={{ maxWidth: '100%', maxHeight: '350px', objectFit: 'contain' }}
              alt={product.name} 
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2 className="fw-bold mb-3">{product.name}</h2>
            <p className="fs-5 text-muted">
              Price: <span className="text-dark fw-bold">${product.price.toFixed(2)}</span>
            </p>
            <p className="text-muted">{product.description}</p>
            <button 
              className="btn btn-primary btn-lg mt-3 w-100 shadow-sm" 
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>
            <Link to="/products" className="btn btn-outline-secondary btn-sm mt-3 w-100">
              ⬅ Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
