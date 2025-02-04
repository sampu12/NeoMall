import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const Products = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8989/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  return (
    <div>
      <header className="text-white text-center py-4 shadow-lg" style={{ background: 'linear-gradient(90deg, #1e3c72, #2a5298)' }}>
        <h1 className="fw-bold">Virtual Shopping Mall</h1>
        <p className="lead">Your Ultimate Online Shopping & Social Experience</p>
      </header>

      <nav className="bg-dark py-2 shadow-sm text-center">
        <Link to="/" className="text-white mx-3 fw-semibold">Home</Link>
        <Link to="/products" className="text-warning mx-3 fw-semibold">Products</Link>
        <Link to="/cart" className="text-white mx-3 fw-semibold">Cart</Link>
        <Link to="/social-feed" className="text-white mx-3 fw-semibold">Social Feed</Link>
      </nav>

      <div className="container mt-5">
        <h2 className="fw-bold text-dark text-center">Browse Our Products</h2>
        <div className="row mt-4">
          {products.map(product => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card shadow-sm border-0">
                <img src={product.img} className="card-img-top" alt={product.name} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{product.name}</h5>
                  <p className="text-muted">{product.price}</p>
                  <Link to={`/product-details/${product.id}`} className="btn btn-primary btn-sm">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="text-white text-center py-3 mt-5 shadow-lg" style={{ background: 'linear-gradient(90deg, #1e3c72, #2a5298)' }}>
        <p className="mb-0">&copy; 2025 Virtual Shopping Mall | All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Products;
