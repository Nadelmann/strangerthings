import { useState } from 'react'
import NavBar from './Components/NavBar'
import './App.css'
import { Routes, Route } from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <div id="main-section">
          <NavBar />
          <Routes>
            <Route path="/posts" element={<Posts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
      </div>
    </div>
    </>
  )
}

export default App
