import React from "react";
import { LuPencil } from "react-icons/lu";
import { IoSearch, IoArchiveOutline, IoExitOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FiFileText, FiTrash } from "react-icons/fi";
import { FaRegFolder, FaRegFolderOpen, FaRegHeart } from "react-icons/fa";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { IoIosMore } from "react-icons/io";

const Menu = (props) => {
  const [mouseInDots, setMouseInDots] = React.useState(false);
  const [mouseInSettings, setMouseInSettings] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const handleMouseLeaveDots = () => {
    setMouseInDots(false);
  };
  const handleMouseEnterSettings = () => {
    setMouseInSettings(true);
  };
  const handleMouseLeaveSettings = () => {
    setMouseInSettings(false);
  };
  const handleMouseEnterDots = () => {
    setMouseInDots(true);
  };
  React.useEffect(() => {
    if (mouseInDots || mouseInSettings) {
      setShowSettings(true);
    } else {
      setShowSettings(false);
    }
  }, [mouseInDots, mouseInSettings]);
  return (
    <div className="w-[20%] h-[100vh] flex flex-col  pt-7 font-medium">
      <div className="box1 w-full  font px-3 flex justify-between items-center">
        <div className="group flex">
          <div className="txt text-2xl custom-kaushan">Nowted</div>
          <div className="frame flex items-start">
            <LuPencil className="text-lg ml-2" />
          </div>
        </div>
        <div className="search">
          <IoSearch className="text-2xl opacity-50" />
        </div>
      </div>
      <div className="box2  w-full flex justify-center items-center h-[5%] mt-5 ">
        <div className="newnote flex h-full w-[80%] bg-neutral-800 justify-center items-center gap-1 font-medium">
          <IoMdAdd className="text-xl " />
          <span>New Note</span>
        </div>
      </div>
      <div className="box3  w-full h-[20%] mt-5 flex flex-col ">
        <div className="recent w-[20%] opacity-50 text-sm pl-3">Recents</div>
        <div className="rec-notes flex flex-col my-2">
          {props.recentNotes.map((recent) => (
            <div
              className={`note flex pl-3 cursor-pointer hover:bg-[#312EB5] h-[5vh] items-center overflow-hidden ${
                props.currentNoteId === recent.id &&
                props.currentFolder === recent.folder
                  ? "opacity-100 bg-[#312EB5]"
                  : "opacity-50"
              }`}
              onClick={() => props.setCurrentNoteId(recent.id)}
              key={recent.id}
            >
              <FiFileText className="text-2xl " />
              <div className="text-lg max-h-full overflow-hidden whitespace-nowrap text-ellipsis ml-2">
                {recent.title || "Untitled Note"}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="box4 max-h-[30%] w-full h-[20%] mt-5 flex flex-col">
        <div className="folders  opacity-50  pl-3 flex justify-between">
          <span className="text-sm">Folder</span>
          <HiOutlineFolderAdd className="text-2xl mr-4" />
        </div>
        <div className="folder-list max-h-[30vh]  w-full h-[20vh] flex flex-col overflow-y-scroll scrollbar">
          {props.folders.map((folder) => (
            <div
              className={`folder cursor-pointer flex pl-3  min-h-[5vh] items-center overflow-hidden ${
                props.currentFolder === folder
                  ? "opacity-100 bg-neutral-800"
                  : "opacity-50"
              } hover:bg-neutral-800`}
              onClick={() => props.setCurrentFolder(folder)}
              key={folder}
            >
              {props.currentFolder === folder ? (
                <FaRegFolderOpen className="text-2xl " />
              ) : (
                <FaRegFolder className="text-2xl " />
              )}
              <div className="text-lg max-h-full overflow-hidden whitespace-nowrap text-ellipsis ml-2 ">
                {folder || "Untitled Folder"}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="box5  w-full h-[20%] mt-5 flex flex-col">
        <div className="more opacity-50  pl-3">
          <span className="text-sm">More</span>
        </div>
        <div className="more-list flex flex-col my-2">
          <div
            className={`favourie flex pl-3  h-[5vh] items-center overflow-hidden hover:opacity-100 cursor-pointer ${
              props.currentFolder === "favourite" ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => props.setCurrentFolder("favourite")}
          >
            <FaRegHeart className="text-2xl " />
            <div className="text-lg max-h-full overflow-hidden whitespace-nowrap text-ellipsis ml-2 ">
              Favourites
            </div>
          </div>
          <div
            className={`trash flex pl-3  h-[5vh] items-center overflow-hidden hover:opacity-100 cursor-pointer ${
              props.currentFolder === "trash" ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => props.setCurrentFolder("trash")}
          >
            <FiTrash className="text-2xl " />
            <div className="text-lg max-h-full overflow-hidden whitespace-nowrap text-ellipsis ml-2">
              Trash
            </div>
          </div>
          <div
            className={`archive flex pl-3  h-[5vh] items-center overflow-hidden hover:opacity-100 cursor-pointer ${
              props.currentFolder === "archive" ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => props.setCurrentFolder("archive")}
          >
            <IoArchiveOutline className="text-2xl " />
            <div className="text-lg max-h-full overflow-hidden whitespace-nowrap text-ellipsis ml-2">
              Archive
            </div>
          </div>
        </div>
      </div>
      <div className="box6 w-full flex mt-10 mx-auto justify-between items-center gap-2 font-medium rounded-3xl p-2 hover:bg-neutral-800 max-w-full">
        <div className="left flex items-center gap-2">
          <div className="left">
            <img
              src="https://avatars.githubusercontent.com/u/80841276?v=4"
              alt=""
              className="h-10 w-10 rounded-3xl "
            />
          </div>
          <div className="mid flex flex-col">
            <div className="username">Sujan Gyawali</div>
            <div className="email opacity-50">sujan@example.com</div>
          </div>
        </div>

        <div className="right">
          <IoIosMore
            className="text-2xl opacity-50 hover:opacity-100 cursor-pointer"
            onMouseEnter={handleMouseEnterDots}
            onMouseLeave={handleMouseLeaveDots}
          />
        </div>
        <div
          className={`settings flex flex-col fixed left-[18vw] top-[calc(100vh-22vh)] bg-neutral-800 rounded-lg gap-2  transition-opacity duration-300 z-100 ${
            showSettings ? "opacity-100" : "opacity-0"
          }`}
          onMouseEnter={handleMouseEnterSettings}
          onMouseLeave={handleMouseLeaveSettings}
        >
          <span className="hover:bg-neutral-700 w-[100%] h-[50%] p-2 rounded-lg flex items-center gap-2 cursor-pointer">
            <LuPencil className="text-sm" />
            Edit User
          </span>
          <span className="hover:bg-neutral-700 w-[100%] h-[50%] p-2 rounded-lg flex items-center gap-2 cursor-pointer">
            <IoExitOutline className="text-sm" />
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
