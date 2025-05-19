import React from "react";

const Addnotes = (props) => {
  const [newTitle, setNewTitle] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");

  const handleAddNote = (e) => {
    e.preventDefault();

    const newNote = {
      "title": newTitle,
        "description": newDescription,
    };

    props.setNewNote(newNote);
    props.setAdd(false);
  };

  return (
    <div
      ref={props.ref}
      className={`fixed flex flex-col items-center justify-around h-[60vh] w-[30vw] bg-indigo-500 rounded-2xl shadow-lg text-white p-4 m-3 border-3 border-indigo-900 ${
        props.add
          ? "z-10 top-[20vh] left-[35vw]"
          : "top-[-20vh] left-[35vw] -z-10"
      } transition-all 500 ease-in-out`}
    >
      <div className="top flex text-3xl font-medium">
        <span>Add a new note</span>
      </div>
      <div className="mid flex flex-col w-full gap-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full h-10 rounded-2xl p-2 outline-none decoration-white border-2 border-indigo-900 text-xl"
          value={newTitle}
          name="title"
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Description"
          className="w-full h-50 rounded-2xl p-2 decoration-white border-2 border-indigo-900 text-lg outline-none"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="bottom w-[50%]">
        {" "}
        <button
          className="bg-indigo-950 w-full h-10 rounded-lg hover:bg-indigo-800 transition-all 200 ease-in-out"
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default Addnotes;
