import React from "react";
import Login from './screens/Login';
import Register from './screens/Register';
import Home from "./screens/Home";
import Fotter from "./components/Fotter";
import NavigationBar from "./components/NavigationBar";
import Gents from "./screens/Gents";
import Ladies from "./screens/Ladies";
import Kids from "./screens/Kids";
import Accessories from "./screens/Accessories";
import Checkout from "./screens/Checkout";
import Cart from "./screens/Cart";
import Profile from "./screens/Profile";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Clerk from "./screens/company/clerk/Clerk";
import Admin from "./screens/company/admin/Admin";
import Pm from "./screens/company/pm/Pm"
import Ca from "./screens/company/ca/Ca";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />

        <Route path="gents" element={<Gents />} />
        <Route path="ladies" element={<Ladies />} />
        <Route path="kids" element={<Kids />} />

        <Route path="profile" element={<Profile />} />
        <Route path="register" element={<Register />} />

        <Route path="checkout" element={<Checkout />} />
        <Route path="cart" element={<Cart />} />
        <Route path="accessories" element={<Accessories />} />

        <Route path="clerk" element={<Clerk />} />
        <Route path="admin" element={<Admin />} />
        <Route path="pm" element={<Pm />} />
        <Route path="ca" element={<Ca />} />
      </Routes>
      <Fotter />
    </BrowserRouter>
  );
}

export default App;
