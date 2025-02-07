import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ isLoggedIn }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8989/products')
      .then(response => response.json())
      .then(data => {
        const shuffledProducts = data.sort(() => 0.5 - Math.random());
        setProducts(shuffledProducts.slice(0, 6));
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ background: 'linear-gradient(135deg, #eef2f3, #d9e8ec)', fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="container my-auto">
        <div className="row">
          <main className="col-12 p-5 rounded shadow-lg">
            <h2 className="fw-bold text-dark text-center">Welcome to NeoMall</h2>
            <p className="lead text-muted text-center">
              Experience seamless shopping with the best deals and social interactions!
            </p>

            {/* Featured Products Section */}
            <div className="mt-4">
              <h4 className="fw-bold text-primary text-center">🌟 Featured Products</h4>
              <div className="row mt-4">
                {products.map(product => (
                  <div key={product.productId.productId} className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div
                        className="card-img-wrapper"
                        style={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <img
                          src={`/images/${product.image}`}
                          className="card-img-top img-fluid"
                          alt={product.name}
                          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                        />
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold">{product.name}</h5>
                        <p className="card-text text-muted">
                          {product.description.length > 70
                            ? `${product.description.slice(0, 70)}...`
                            : product.description}
                        </p>
                        <Link
                          to={`/products/${product.productId.categoryId}/${product.productId.productId}`}
                          className="btn btn-primary btn-sm mt-auto"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
