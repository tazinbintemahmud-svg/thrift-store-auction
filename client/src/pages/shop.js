import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './shop.css';

const Shop = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setItems(response.data);
      } catch (err) {
        setError('Failed to fetch thrift items.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!items || items.length === 0) return <p>No items found.</p>;

  return (
    <div className="shop-container">
      <h1 className="shop-title">VintageVault - Thrift Items</h1>
      <div className="products-grid">
        {items.map((item) => (
          <div className="product-card" key={item._id}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Condition:</strong> {item.condition}</p>
            <p><strong>Brand:</strong> {item.brand}</p>
            <p><strong>Price:</strong> BDT{item.price}</p>
            <p><strong>Auction Ends:</strong> {new Date(item.auctionEnds).toLocaleString()}</p>
            <Link to={`/product/${item._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
