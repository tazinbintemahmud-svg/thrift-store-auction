// client/src/components/ThriftItemList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ThriftItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Thrift Items</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {items.map(item => (
          <div key={item._id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <img src={item.image} alt={item.title} style={{ width: '100%' }} />
            <h3>{item.title}</h3>
            <p>Price: ${item.basePrice}</p>
            <p>Status: {item.auctionStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThriftItemList;
