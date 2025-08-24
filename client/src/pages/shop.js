import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './shop.css';

const Shop = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, [searchTerm, category]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        params: { search: searchTerm, category }
      });
      setItems(response.data);

      const uniqueCategories = ['All', ...new Set(response.data.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError('Failed to fetch thrift items.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!items || items.length === 0) return <p>No items found.</p>;

  return (
    <div className="shop-container">
      {/* Header with Title + Profile Button */}
      <div className="shop-header">
        <h1 className="shop-title">VintageVault - Thrift Items</h1>
        <button
          onClick={() => navigate('/profile')}
          className="profile-btn"
        >
          My Profile
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by name, brand, or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
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
