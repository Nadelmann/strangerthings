import { NavBar } from "./Components/NavBar";
import './App.css';
import { Navigate, Routes, Route } from "react-router-dom"; 
import AllPosts from "./Components/AllPosts";
import UserLogin from "./Components/UserLogin";
import Profile from "./Components/Profile";
import { useState } from "react";
import Home from "./Components/Home";
import { NewUserForm } from "./Components/NewUserForm";


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
              <Route
                  path="/profile"
                   element={
                     isLoggedIn ? (
                 <Profile />
                      ) : (
              <Navigate to="/userlogin" replace />
      )
    }
  />
  <Route path="/userlogin" element={<UserLogin onLogin={setLoggedIn} />} />
  <Route path="/newuserform" element={<NewUserForm />} />
</Routes>

        </div>
      </div>

  );
}
