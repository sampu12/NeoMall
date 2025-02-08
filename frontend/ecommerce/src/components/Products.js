import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

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
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories([]);
        }
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Wrap filtering logic in useCallback with its dependencies.
  const applyFilters = useCallback(() => {
    let filtered = [...products];

    // If a category is selected, convert it to number for proper comparison.
    if (selectedCategoryId) {
      const categoryNum = Number(selectedCategoryId);
      filtered = filtered.filter(product => product.productId.categoryId === categoryNum);
    }

    // Apply search filter.
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset pagination when filters change.
  }, [products, selectedCategoryId, searchQuery]);

  // Call applyFilters whenever the dependencies change.
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Paginate the filteredProducts array.
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

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
            onChange={handleCategoryChange}
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
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map(product => (
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
                  <Link
                    to={`/products/${product.productId.categoryId}/${product.productId.productId}`}
                    className="btn btn-primary btn-sm mt-2"
                  >
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
        <div className="pagination mt-4 text-center">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`btn ${index + 1 === currentPage ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
