import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import Shop from './pages/shop';


function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

