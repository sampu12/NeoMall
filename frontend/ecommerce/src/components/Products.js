import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetch('http://localhost:8989/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));

    fetch('http://localhost:8989/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);

    if (query.trim() === '') {
      setFilteredProducts(products);
      return;
    }

    const searchResults = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(searchResults);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage(1);

    if (!categoryId) {
      setFilteredProducts(products);
      return;
    }

    const categoryFilteredProducts = products.filter(
      product => product.productId.categoryId === categoryId
    );
    setFilteredProducts(categoryFilteredProducts);
  };

  // Pagination logic
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-dark text-center">Explore Our Products</h2>

      <div className="row mt-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for products..."
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedCategoryId}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mt-5">
        {currentItems.length > 0 ? (
          currentItems.map(product => (
            <div key={`${product.productId.categoryId}-${product.productId.productId}`} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-img-top-wrapper">
                  <img
                    src={`/images/${product.image}`}
                    className="card-img-top img-fluid"
                    alt={product.name}
                    style={{
                      maxHeight: '200px',
                      objectFit: 'contain',
                      padding: '10px',
                    }}
                  />
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <h5 className="card-title fw-bold text-truncate">{product.name}</h5>
                  <p className="text-muted fs-5">${product.price.toFixed(2)}</p>
                  <Link to={`/products/${product.productId.categoryId}/${product.productId.productId}`} className="btn btn-primary btn-sm mt-2">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4 text-muted">No products found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            {[...Array(totalPages).keys()].map(page => (
              <li
                key={page}
                className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(page + 1)}
              >
                <button className="page-link">{page + 1}</button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Products;
