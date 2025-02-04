import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const products = [
  { id: 1, name: "Wireless Headphones", price: "$99.99", img: "https://via.placeholder.com/200", description: "High-quality wireless headphones with noise-canceling feature." },
  { id: 2, name: "Smartphone Case", price: "$19.99", img: "https://via.placeholder.com/200", description: "Durable and stylish smartphone case with a sleek design." },
  { id: 3, name: "Smartwatch", price: "$149.99", img: "https://via.placeholder.com/200", description: "Track your fitness goals with this modern smartwatch." },
  { id: 4, name: "Laptop Bag", price: "$39.99", img: "https://via.placeholder.com/200", description: "Spacious and stylish laptop bag with multiple compartments." }
];

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(product => product.id === parseInt(id));

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

      {/* Product Details */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img src={product.img} className="img-fluid" alt={product.name} />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold">{product.name}</h2>
            <p className="text-muted">{product.price}</p>
            <p>{product.description}</p>
            <button className="btn btn-primary btn-sm">Add to Cart</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white text-center py-3 mt-5 shadow-lg" style={{ background: 'linear-gradient(90deg, #1e3c72, #2a5298)' }}>
        <p className="mb-0">&copy; 2025 Virtual Shopping Mall | All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ProductDetails;
