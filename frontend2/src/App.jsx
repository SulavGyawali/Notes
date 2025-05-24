import { useState, useNavigate } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'


function App() {
  const [count, setCount] = useState(0)

  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
