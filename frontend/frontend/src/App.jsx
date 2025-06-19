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
import Cart from './components/Cart';
import MovieList from './components/MovieList';
import AdminAddMovie from './components/AdminAddMovie'; 
import BookingPage from './components/BookingPage';
import GamesList from './components/GameList';
import DiceGame from './components/DiceGame';





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
        <Route path="/cart" element={<Cart />} />
        <Route path="Admindashboard" element={<AdminDashboard />} /> 
        <Route path="movies" element={<MovieList />} />
        <Route path="admin/movies/add" element={<AdminAddMovie />} />
        <Route path="/booking/:movieTitle" element={<BookingPage />} /> 
        <Route path="/gamelist" element={<GamesList/>}/>
        <Route path="/games/dice" element={<DiceGame />} />

      </Route>
    </Routes>
  );
};

export default App;
