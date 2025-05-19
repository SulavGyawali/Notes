import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import axios from "axios";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signup, setSignup] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
  });
  const [token, setToken] = useState('');
  const [tokeType, setTokenType] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    console.log("Login function called");
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post("http://127.0.0.1:8000/auth/login", data);
      setToken(response.data.access_token);
      setTokenType(response.data.token_type);
      setIsLoggedIn(true);
      console.log("Login successful:", response.data);
      console.log("Token:", response.data.access_token);
      console.log("Token type:", response.data.token_type);
      localStorage.setItem("token", response.data.access_token);
    } catch (error) {
      alert("Invalid credentials");
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }
  , []);

  useEffect(() => {
    if (token) {
      handlefetchNotes();
    }
  }
  , [token]);

  useEffect(() => {
    try{
    if(newNote.title && newNote.description) {
      const addNote = async () => {
        try {
          const response = await axios.post("http://localhost:8000/notes", newNote, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          console.log("Note added:", response.data);
          setNotes((prevNotes) => [...prevNotes, response.data]);
        } catch (error) {
          console.error("Error adding note:", error);
        }
      };
      addNote();
    }
    } catch (error) {
      console.error("Error in adding note:", error);
      setIsLoggedIn(false);
      setToken("");
    }
  }, [newNote]);

  const handlefetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setNotes(response.data);
      console.log("Fetched notes:", response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <>
      <div className="App bg-indigo-400 h-screen w-screen flex flex-col justify-between items-center">
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Home
                    notes={notes}
                    setNewNote={setNewNote}
                  />
                ) : signup ? (
                  <Signup
                    newUser={newUser}
                    setNewUser={setNewUser}
                    setUserName={setUserName}
                    setSignup={setSignup}
                    setPassword={setPassword}
                  />
                ) : (
                  <Login
                    handleLogin={handleLogin}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    setSignup={setSignup}
                  />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
