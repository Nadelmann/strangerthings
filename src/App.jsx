import { NavBar } from "./Components/NavBar";
import './App.css';
import { Routes, Route } from "react-router-dom";
import AllPosts from "./Components/AllPosts";
import UserLogin from "./Components/UserLogin";
import Profile from "./Components/Profile";
import { useState } from "react";
import Home from "./Components/Home";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('authToken'));


  return (
    <div>
      <div id="main-section">
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={<Home isLoggedIn={loggedIn} />} />
          <Route path="/posts" element={<AllPosts  />} /> {/* Pass setSelectedPostId */}
          {loggedIn && <Route path="/profile" element={<Profile />} />}
          <Route path="/userlogin" element={<UserLogin setLoggedIn={setLoggedIn} />} />
        </Routes>
      </div>
    </div>
  );
}
