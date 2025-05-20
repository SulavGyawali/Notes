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
  const [editId, setEditId] = useState(null);
  const [editNote, setEditNote] = useState(null);
  const [userName, setUserName] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);

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
      setRefreshToken(response.data.refresh_token);
      setIsLoggedIn(true);
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
    } catch (error) {
      alert("Invalid credentials");
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    const handleRefreshToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/auth/refresh-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setToken(response.data.access_token);
        setTokenType(response.data.token_type);
        localStorage.setItem("token", response.data.access_token);
      }
      catch (error) {
        console.error("Error refreshing token:", error);
        setIsLoggedIn(false);
        setToken("");
      }
    }
    const interval = setInterval(() => {
      if (isLoggedIn) {
        handleRefreshToken();
      }
    }
      , 1000 * 60 * 15); 
    return () => clearInterval(interval);
  }, [isLoggedIn, token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const handleVerifyToken = async () => {
      try {
        const response = await axios.get("http://localhost:8000/auth/verify-token", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setToken(storedToken);
          setIsLoggedIn(true);
        }
      } catch (error) {
        const refresh = localStorage.getItem("refresh_token");
        if (refresh) {
          try {
            console.log("Refreshing token...");
            const response = await axios.get(
              "http://localhost:8000/auth/refresh-token",
              
              {
                headers: {
                  Authorization: `Bearer ${refresh}`,
                  "Content-Type": "application/json",
                },
              }
            );
            setToken(response.data.access_token);
            setIsLoggedIn(true);
          } catch (error) {
            console.error("Error refreshing token:", error);
            setIsLoggedIn(false);
            setToken("");
          }
        } else {
          setIsLoggedIn(false);
          setToken("");
        }
      }
    };
    handleVerifyToken();
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

            setNotes((prevNotes) => [...prevNotes, response.data]);
          } catch (error) {
            console.error("Error adding note:", error);
            console.log("Error message:", error.message);
      if (error.mesage === "Request failed with status code 401") {
        setUnauthorized(true);
        setLogout(true);
        setIsLoggedIn(false);
      }
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
      localStorage.removeItem("refresh_token");
      setIsLoggedIn(false);
      setLogout(false);
    }
  }, [logout]);

  const handleDeleteNote = async (noteId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/notes/${noteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
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

  const handleEditNote = async (editNote) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/notes/${editId}`,
        editNote,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === editId ? response.data : note))
      );
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  const handleCreateUser = async (newUser) => {
    try {
      const data = {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      };
      console.log("Creating user:", data);
      console.log("new user:", newUser);
      const response = await axios.post(
        "http://localhost:8000/users",
        data
      );
      console.log("User created:", response.data);
    }
    catch (error) {
      alert("Error creating user");
      console.error("Error creating user:", error);
    }
  }

  return (
    <>
      <div className="bg-indigo-400 h-screen w-screen flex flex-col justify-between items-center overflow-y-auto overflow-x-hidden pb-4">
        <Router>
          <Navbar
            isLoggedIn={isLoggedIn}
            setPopType={setPopType}
            setShowPopup={setShowPopup}
            setIsLoggedIn={setIsLoggedIn}
            setSignup={setSignup}
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
            setSignup={setSignup}
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
                    setEditId={setEditId}
                    token={token}
                    editId={editId}
                    setNotes={setNotes}
                    editNote={editNote}
                    setEditNote={setEditNote}
                    handleEditNote={handleEditNote}
                    setUnauthorized={setUnauthorized}
                  />
                ) : signup ? (
                
                  <Signup
                    newUser={newUser}
                    setNewUser={setNewUser}
                    setUserName={setUserName}
                    setSignup={setSignup}
                    setPassword={setPassword}
                    handleCreateUser={handleCreateUser}
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
