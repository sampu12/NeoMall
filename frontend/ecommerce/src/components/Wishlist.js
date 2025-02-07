import React from 'react';

const wishlist = [
  { id: 1, name: "Wireless Headphones", price: "$99.99", img: "https://via.placeholder.com/200" },
  { id: 2, name: "Smartphone Case", price: "$19.99", img: "https://via.placeholder.com/200" }
];

const Wishlist = () => {
  return (
    <div>
      {/* Wishlist Items */}
      <div className="container mt-5">
        <h2 className="fw-bold text-dark text-center">Your Saved Products</h2>
        <div className="row mt-4">
          {wishlist.map(item => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="wishlist-item p-3 border shadow-sm">
                <img src={item.img} alt={item.name} className="img-fluid" />
                <h3 className="mt-3">{item.name}</h3>
                <p className="text-muted">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
