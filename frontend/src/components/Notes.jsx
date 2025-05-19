import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const Notes = (props) => {
    props.setNoteId(props.id);
    const handleDelete = () => {
        props.setShowPopup(true);
        props.setPopType("delete");
        
    }
  return (
    <div className="flex flex-col  justify-between h-full w-[30%] bg-indigo-600 rounded-2xl shadow-lg text-white p-4 m-3 border-3 border-indigo-900">
       <div className="top  flex justify-between items-center h-[20%] text-2xl font-medium gap-2">
        <div className="left">Title: {props.title}</div>
        <div className="right flex gap-4">
            <span
                className="cursor-pointer hover:text-white hover:border-white transition-all 200 ease-in-out border-3 p-1 rounded-xl text-lg text-indigo-200 border-indigo-200"
                onClick={() => props.setEdit(true)}
            >
                <AiFillEdit />
            </span>
            <span
                className="cursor-pointer hover:text-white hover:border-white transition-all 200 ease-in-out border-3 p-1 rounded-xl text-lg text-indigo-200 border-indigo-200"
                onClick={() => handleDelete()}
            >
                <AiFillDelete />
            </span>
        </div>
       </div>
       <div className="bottom  h-[70%]">
        <div className="description h-full text-lg font-medium">
          <span >{props.description}</span>
        </div>
       </div>
      
    </div>
  );
};

export default Notes;
