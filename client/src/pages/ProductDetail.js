import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css'; // optional CSS file

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product details.');
        console.error('Product detail fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const calculateTimeLeft = (auctionEnds) => {
    const timeDiff = new Date(auctionEnds) - new Date();
    if (timeDiff <= 0) return 'Auction ended';

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="product-detail-container">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} className="product-image" />
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Condition:</strong> {product.condition}</p>
      <p><strong>Starting Bid:</strong> ${product.price}</p>
      <p><strong>Time Left:</strong> {calculateTimeLeft(product.auctionEnds)}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Auction Ends At:</strong> {new Date(product.auctionEnds).toLocaleString()}</p>
    </div>
  );
};

export default ProductDetail;
