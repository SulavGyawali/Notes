import React from "react";

const List = (props) => {
  return (
    <div className="bg-[#1C1C1C] w-[25%] h-[100%] flex flex-col  pt-7 font-medium">
      <div className="box1 w-full  font px-3 flex justify-between items-center">
        <span className="text-2xl ">{props.currentFolder}</span>
      </div>
      <div className="box2 h-[85vh] w-full  mt-5 flex flex-col overflow-y-scroll scrollbar items-center">
        {props.folderNotes.map((notes) => (
          <div
            className={`note ${
              notes.id === props.currentNoteId
                ? "bg-neutral-700"
                : "bg-neutral-800"
            } w-[80%] min-h-[15%] h-[15%] max-h-[15%] flex flex-col justify-between p-3 mb-5 cursor-pointer`}
            onClick={() => props.setCurrentNoteId(notes.id)}
            key={notes.id}
          >
            <div className="title  max-h-full overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
              <span className="text-xl font-medium">{notes.title}</span>
            </div>
            <div className="info flex text-sm opacity-50 gap-10 font-light">
              <span>
                {new Date(notes.updated_at).toLocaleDateString("en-US")}
              </span>
              <span className="max-h-full overflow-hidden whitespace-nowrap text-ellipsis">
                {notes.description || "No description available"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
