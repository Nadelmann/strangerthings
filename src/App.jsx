import { NavBar } from "./Components/NavBar";
import './App.css';
import { Routes, Route } from "react-router-dom"; // Use BrowserRouter as Router

import AllPosts from "./Components/AllPosts";
import UserLogin from "./Components/UserLogin";
import Profile from "./Components/Profile";
import { useState } from "react";
import Home from "./Components/Home";
import { NewUserForm } from "./Components/NewUserForm";
import PrivateRoute from "./Components/PrivateRoute";

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [selectedPostId, setSelectedPostId] = useState(null);
  
  const handleSelectPost = (postId) => {
    setSelectedPostId(postId);
  };

  return (

      <div>
        <div id="main-section">
          <NavBar isLoggedIn={isLoggedIn} handleLogin={setLoggedIn} />
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/allposts" element={<AllPosts setSelectedPostId={handleSelectPost} />} />
            <PrivateRoute path="/profile" element={<Profile />} isLoggedIn={isLoggedIn} />
            <Route path="/userlogin" element={<UserLogin onLogin={setLoggedIn} />} />
            <Route path="/newuserform" element={<NewUserForm />} />
          </Routes>
        </div>
      </div>

  );
}
