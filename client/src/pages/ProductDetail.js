import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [msg, setMsg] = useState('');
  const [timeLeft, setTimeLeft] = useState(''); 

  
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  }, []);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(data);
    } catch (err) {
      console.error(' Failed to fetch product', err);
      setMsg('Failed to load product');
    }
  };

  
  useEffect(() => {
    loadProduct();
    const t = setInterval(loadProduct, 3000);
    return () => clearInterval(t);
    
  }, [id]);

  
  useEffect(() => {
    if (!product?.auctionEnds) return;
    const tick = () => {
      const end = new Date(product.auctionEnds).getTime();
      const now = Date.now();
      const diff = end - now;
      if (diff <= 0) {
        setTimeLeft('Auction ended');
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, [product]);

  if (!product) return <p style={{ padding: 20 }}>Loading...</p>;

  
  const current = product.currentBid != null ? product.currentBid : product.price;
  const minNext = current + 1; 

  const placeBid = async () => {
    setMsg('');

    if (!user) {
      setMsg('Please log in to place a bid.');
      
      return;
    }

    const num = Number(bidAmount);
    if (Number.isNaN(num)) return setMsg('Enter a valid number.');
    if (num <= current) return setMsg(`Your bid must be greater than ${current}.`);

    try {
      const { data } = await axios.post(`http://localhost:5000/api/products/${id}/bid`, {
        amount: num,
        userId: user.id || user._id || user.email, 
      });
      setProduct(data.product);
      setBidAmount('');
      setMsg('Bid placed successfully!');
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Failed to place bid.');
    }
  };

  return (
    <div className="pd-container">
      {/* LEFT: image + info */}
      <div className="pd-left">
        <img src={product.image} alt={product.title} className="pd-image" />
        <h1 className="pd-title">{product.title}</h1>
        <p className="pd-desc">{product.description}</p>
        <div className="pd-meta">
          <span><strong>Category:</strong> {product.category}</span>
          <span><strong>Brand:</strong> {product.brand}</span>
          <span><strong>Condition:</strong> {product.condition}</span>
        </div>
      </div>

      {/* RIGHT: bidding panel */}
      <div className="pd-right">
        <h2 className="pd-right-title">{product.title}</h2>

        <div className="pd-info-row">
          <div><span className="muted">Time left:</span> <strong>{timeLeft}</strong></div>
          <div className="sep">|</div>
          <div><span className="muted">Bids:</span> <strong>{product.bids?.length || 0}</strong></div>
        </div>

        <div className="pd-card">
          <div className="pd-line">
            <span className="muted">Current Price:</span>
            <strong>BDT {current.toFixed(2)}</strong>
          </div>

          <div className="pd-line">
            <span className="muted">Minimum Bid:</span>
            <span>BDT {minNext.toFixed(2)}</span>
          </div>

          <div className="pd-line vertical">
            <label className="muted">Set Your Maximum Bid:</label>
            <input
              type="number"
              min={minNext}
              step="1"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="pd-input"
              placeholder="0.00"
              disabled={timeLeft === 'Auction ended'}
            />
          </div>

          <button
            className="pd-bid-btn"
            onClick={placeBid}
            disabled={timeLeft === 'Auction ended'}
          >
            Place My Bid
          </button>

          {msg && <p className="pd-message">{msg}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
