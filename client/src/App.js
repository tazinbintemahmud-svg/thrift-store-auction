import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/shop";   
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Auth/Login/Signup (homepage) */}
          <Route path="/" element={<AuthPage />} />

          {/* Shop page after login */}
          <Route path="/shop" element={<Shop />} />

          {/* Product detail page */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Fallback auth page */}
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
