import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Registration';
import Navbar from './components/Navbar';
import Menu from './components/menu';
import OrderPage from './components/Order'; 

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<OrderPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;