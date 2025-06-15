import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          {/* Add more nested routes here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

