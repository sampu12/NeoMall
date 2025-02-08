import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ isLoggedIn }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8989/products')
      .then(response => response.json())
      .then(data => {
        const shuffledProducts = data.sort(() => 0.5 - Math.random());
        setProducts(shuffledProducts.slice(0, 15));
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Welcome Section with Blue Background */}
      <div className="py-5" style={{ backgroundColor: '#007bff' }}>
        <div className="container">
          <h2 className="fw-bold text-white text-center">Welcome to NeoMall</h2>
          <p className="lead text-white text-center">
            Experience seamless shopping with the best deals and social interactions!
          </p>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <h4 className="fw-bold text-center text-primary mb-4">🌟 Featured Products</h4>
          </div>
        </div>
        <div className="row">
          {products.map(product => (
            <div
              key={`${product.productId.categoryId}-${product.productId.productId}`}
              className="col-lg-4 col-md-6 mb-4"
            >
              <div className="card h-100 border-0 shadow-sm">
                <div
                  className="card-img-wrapper d-flex justify-content-center align-items-center"
                  style={{ height: '250px', backgroundColor: '#f8f9fa' }}
                >
                  <img
                    src={`/images/${product.image}`}
                    className="card-img-top img-fluid"
                    alt={product.name}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-primary">{product.name}</h5>
                  <p className="card-text text-muted">
                    {product.description.length > 70
                      ? `${product.description.slice(0, 70)}...`
                      : product.description}
                  </p>
                  <Link
                    to={`/products/${product.productId.categoryId}/${product.productId.productId}`}
                    className="btn btn-outline-primary btn-sm mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="col-12">
              <p className="text-center text-muted">No products available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
