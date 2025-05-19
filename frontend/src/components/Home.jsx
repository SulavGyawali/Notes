import Notes from "./Notes";
import Addnotes from "./Addnotes";
import React, { useState, useEffect, useRef } from "react";

const Home = (props) => {
  const [add, setAdd] = useState(false);
  const [clicked, setClicked] = useState(false);
  const pop = useRef(null);


  const handleClick = () => {
    setClicked(!clicked);
    setTimeout(() => {
      setClicked(false);
    }, 200);
    setAdd(true);
  };

  const handleClosePop = () => {
    setAdd(false);
  };

  useEffect(() => {
    if (add) {
      const handleClickOutside = (event) => {
        if (pop.current && !pop.current.contains(event.target)) {
          handleClosePop();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [add]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
            handleClosePop();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
        }
    , []);

  return (
    <div
      className={`relative flex flex-col gap-2 items-between justify-around min-h-[80vh] w-[90vw] mx-auto mt-[10vh] p-5 mb-5 over`}
    >
      <Addnotes add={add} ref={pop} setNewNote={props.setNewNote} setAdd={setAdd}/>
      <button
        className={`${
          clicked ? "bg-indigo-500" : "bg-indigo-600"
        } p-3 text-lg font-medium border-2 border-white rounded-2xl text-white  cursor-pointer w-[20%]   transition-all 200 ease-in-out mx-auto`}
        onClick={handleClick}
      >
        Add notes
      </button>
      <div className="notes flex flex-wrap justify-center h-[45vh]  gap-4 mt-5 mb-10 ">
        
        {props.notes.length === 0 && (
          <div className="text-white text-2xl font-medium">
            No notes available
          </div>
        )}
        {
        props.notes.map((note) => (
          <Notes
            key={note.id}
            id={note.id}
            title={note.title}
            description={note.description}
            setPopType={props.setPopType}
            setShowPopup={props.setShowPopup}
            setNoteId={props.setNoteId}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
