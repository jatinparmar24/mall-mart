import React from 'react';
import './App.css'; 
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Signup from './components/SignUp';
import Login from './components/Login';
import Items from './components/Items';
import Home from './components/Home';
import CategoryItems from "./components/CategoryItems";
import BuyNow from './components/BuyNow';
import AdminDashboard from "./components/AdminDashboard";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="items" element={<Items />} />
        <Route path="items/:category" element={<CategoryItems />} />
        <Route path="/buy" element={<BuyNow />} />
        <Route path="Admindashboard" element={<AdminDashboard />} /> 
      </Route>
    </Routes>
  );
};

export default App;



