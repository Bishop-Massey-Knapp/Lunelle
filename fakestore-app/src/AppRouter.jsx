import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/new" element={<AddProduct />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      {/* You can add more routes here */}
    </Routes>
  </Router>
);

export default AppRouter;
