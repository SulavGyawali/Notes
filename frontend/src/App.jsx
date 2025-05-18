import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react'
import Home from './components/Home'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([
  {
    "title": "this is a note",
    "description": "this is a desc",
    "id": 1,
    "created_at": "2025-05-18T15:11:05.884630Z",
    "updated_at": "2025-05-18T15:11:05.884630Z",
    "user_id": 4
  },
  {
    "title": "this is a note",
    "description": "this is a desc",
    "id": 2,
    "created_at": "2025-05-18T15:11:14.429554Z",
    "updated_at": "2025-05-18T15:11:14.429554Z",
    "user_id": 4
  },
  {
    "title": "this is a note",
    "description": "this is a desc",
    "id": 3,
    "created_at": "2025-05-18T15:11:15.830179Z",
    "updated_at": "2025-05-18T15:11:15.830179Z",
    "user_id": 4
  }
])

  return (
    <>
    <div >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={isLoggedIn? <Home notes={notes}/> : <h1>Please log in</h1>} />
        </Routes>
      </Router>
      
    </div>
    </>
  )
}

export default App
