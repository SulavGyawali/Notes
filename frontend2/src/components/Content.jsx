import { CiCircleMore } from "react-icons/ci";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegFolder, FaRegCopy } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuBold, LuItalic, LuUnderline } from "react-icons/lu";
import Editor, { BtnBold, BtnItalic, Toolbar } from "react-simple-wysiwyg";
import { useEffect, useState } from "react";

const Content = (props) => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState();
  const [folder, setFolder] = useState("");
  const [showSave, setShowSave] = useState(false);

  const handleSave = () => {
    if (props.currentNoteId) {
      props.setUpdatedNote({
        id: props.currentNote.id,
        title: title,
        description: value,
        folder: folder,
        created_at: props.currentNote.created_at,
        updated_at: new Date().toISOString(),
      });
      props.setCurrentNote({
        ...props.currentNote,
        title: title,
        description: value,
        folder: folder,
        updated_at: new Date().toISOString(),
      });
      setShowSave(false);
    } else {
      props.setNewNote({
        title: title,
        description: value,
        folder: folder,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      props.setCurrentNote({
        title: title,
        description: value,
        folder: folder,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      props.setCurrentNoteId(null);
      setTitle("");
      setValue("");
      setFolder("Personal");
      setDate(new Date().toLocaleDateString("en-US"));
      setShowSave(false);
    }
  };

  useEffect(() => {
    if (props.currentNote) {
      setTitle(props.currentNote.title);
      setValue(props.currentNote.description);
      setDate(
        new Date(props.currentNote.updated_at).toLocaleDateString("en-US")
      );
      setFolder(props.currentNote.folder || "Personal");
    }
  }, [props.currentNote]);

  useEffect(() => {
    if (props.currentNote) {
      if (
        props.currentNote.title !== title ||
        props.currentNote.description !== value
      ) {
        setShowSave(true);
      } else {
        setShowSave(false);
      }
    }
  }, [title, value, props.currentNote]);

  return (
    <div className="w-[55%] h-[100%] flex flex-col p-2 px-7  ">
      <div className="box1 mt-7 flex justify-between text-2xl font-medium">
        <input
          type="text"
          value={title}
          className="w-full focus:outline-0"
          onChange={(e) => setTitle(e.target.value)}
        />
        <CiCircleMore className="opacity-50" />
      </div>
      <div className="box2 flex mt-5 gap-10 items-center">
        <div className="date flex opacity-50 gap-5 items-center">
          <MdOutlineCalendarMonth className="text-2xl " />
          <span>Date</span>
        </div>
        <div className="value underline-offset-2 underline decoration-[1px]">
          {date}
        </div>
      </div>
      <div className="separator w-full h-[0.5px] mx-auto bg-neutral-600 m-3"></div>
      <div className="box3 flex gap-10 items-center">
        <div className="date flex opacity-50 gap-5 items-center">
          <FaRegFolder className="text-2xl " />
          <span>Folder</span>
        </div>
        <div className="value underline-offset-2 underline decoration-[1px]">
          {folder}
        </div>
      </div>
      <div className="separator w-full h-[0.5px] mx-auto bg-neutral-600 m-3"></div>

      <div className="box4 h-[65%]">
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          containerProps={{
            style: {
              background: "none",
              border: "none",
            },
          }}
          style={{ background: "none" }}
          className="ql-editor overflow-y-scroll scrollbar"
          hideButtons={["HTML mode"]}
        ></Editor>
      </div>
      <div className="confirm flex w-[100%] justify-end mt-5">
        <button
          className={`w-[10vw] h-[5vh] bg-white text-black text-xl font-medium cursor-pointer hover:bg-gray-200 ${
            showSave ? "" : "hidden"
          }`}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Content;
