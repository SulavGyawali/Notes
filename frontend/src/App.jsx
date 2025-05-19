import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Home from "./components/Home";
import axios from "axios";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Popup from "./components/Popup";

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
  const [token, setToken] = useState("");
  const [tokeType, setTokenType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const pop = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popType, setPopType] = useState("");
  const [logout, setLogout] = useState(false);
  const [noteId, setNoteId] = useState(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pop.current && !pop.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowPopup(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPopup]);

  const handleLogin = async () => {
    console.log("Login function called");
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        data
      );
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
  }, []);

  useEffect(() => {
    if (token) {
      handlefetchNotes();
    }
  }, [token]);

  useEffect(() => {
    try {
      if (newNote.title && newNote.description) {
        const addNote = async () => {
          try {
            const response = await axios.post(
              "http://localhost:8000/notes",
              newNote,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
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

  useEffect(() => {
    if (logout) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setLogout(false);
    }
  }, [logout]);

  const handleDeleteNote = async (noteId) => {
    try {
      console.log("Delete function called");
      console.log("Note ID to delete:", noteId);
      const response = await axios.delete(`http://localhost:8000/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Note deleted:", response.data);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

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
      <div className="bg-indigo-400 h-screen w-screen flex flex-col justify-between items-center overflow-y-auto overflow-x-hidden pb-4">
        <Router>
          <Navbar
            isLoggedIn={isLoggedIn}
            setPopType={setPopType}
            setShowPopup={setShowPopup}
          />
          <Popup
            ref={pop}
            showPopup={showPopup}
            popType={popType}
            setIsLoggedIn={setIsLoggedIn}
            setShowPopup={setShowPopup}
            setLogout={setLogout}
            handleDeleteNote={handleDeleteNote}
            noteId={noteId}
          />
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Home
                    notes={notes}
                    setNewNote={setNewNote}
                    setPopType={setPopType}
                    setShowPopup={setShowPopup}
                    setNoteId={setNoteId}
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
