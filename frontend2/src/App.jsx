import { useState, useEffect, use } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [tokenType, setTokenType] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [recentNotes, setRecentNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [folderNotes, setFolderNotes] = useState([]);

  const handleCreateUser = async (newUser) => {
    try {
      const data = {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      };
      console.log("Creating user:", data);
      console.log("new user:", newUser);
      const response = await axios.post("http://localhost:8000/users", data);
      console.log("User created:", response.data);
      // handleAlert("User Created Successfully!", "success");
    } catch (error) {
      // handleAlert("Error creating user!", "error");
      console.error("Error creating user:", error);
    }
  };

  const handleFetchFolderNotes = async (folderName) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/notes/folder/${folderName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFolderNotes(response.data);
      setCurrentFolder(folderName);
      
    } catch (error) {
      // handleAlert("Error fetching folder notes!", "error");
      console.error("Error fetching folder notes:", error);
    }
  };

  useEffect(() => {
    if (currentFolder) {
      handleFetchFolderNotes(currentFolder);
    }
  }, [currentFolder, token]);

  const handlefetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setNotes(response.data);
    } catch (error) {
      // handleAlert("Error fetching notes!", "error");
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    const fetchNote = async (noteId) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/notes/${noteId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCurrentNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };
    if (currentNoteId) {
      fetchNote(currentNoteId);
    }
  }, [currentNoteId]);

  useEffect(() => {
    if (currentNote) {
      if (currentNote.folder) {
        setCurrentFolder(currentNote.folder);
      } else {
        setCurrentFolder(null);
      }
    }
  }, [currentNote]);

  useEffect(() => {
    const updateFolders = () => {
      const uniqueFolders = [...folders];
      notes.forEach((note) => {
        if (note.folder && !uniqueFolders.includes(note.folder)) {
          uniqueFolders.push(note.folder);
        }
      });

      setFolders(uniqueFolders);
    };
    updateFolders();
  }, [notes]);
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if(currentFolder){
      const uniqueFolders = [...folders];
      if (!uniqueFolders.includes(currentFolder)) {
        uniqueFolders.push(currentFolder);
        setFolders(uniqueFolders);
      }
    }
  }, [currentFolder, folders]);


  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const handleRecentNotes = () => {
      const recentNote = notes.slice(-3);
      recentNote.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );

      setRecentNotes(recentNote);
    };
    handleRecentNotes();
  }, [notes]);

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
      } catch (error) {
        console.error("Error refreshing token:", error);
        setIsLoggedIn(false);
        setToken("");
      }
    };
    const interval = setInterval(() => {
      if (isLoggedIn) {
        handleRefreshToken();
      }
    }, 1000 * 60 * 15);
    return () => clearInterval(interval);
  }, [isLoggedIn, token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const handleVerifyToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/auth/verify-token",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setToken(storedToken);
          setIsLoggedIn(true);
        }
      } catch (error) {
        const refresh = localStorage.getItem("refresh_token");
        if (refresh) {
          try {
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
      localStorage.setItem("token", token);
    }
  }, [token]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            notes={notes}
            folders={folders}
            recentNotes={recentNotes}
            setNotes={setNotes}
            setFolders={setFolders}
            setCurrentFolder={setCurrentFolder}
            currentFolder={currentFolder}
            currentNote={currentNote}
            setCurrentNote={setCurrentNote}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            currentNoteId={currentNoteId}
            setCurrentNoteId={setCurrentNoteId}
            folderNotes={folderNotes}
          />
        }
      />
      <Route
        path="/login"
        element={
          <Login
            setIsLoggedIn={setIsLoggedIn}
            setToken={setToken}
            setTokenType={setTokenType}
            setRefreshToken={setRefreshToken}
            isLoggedIn={isLoggedIn}
          />
        }
      />
    </Routes>
  );
}

export default App;
