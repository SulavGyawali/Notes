const Popup = (props) => {
  const title = props.popType === "logout" ? "Logout" : "Delete";

  const message =
    props.popType === "logout"
      ? "Are you sure you want to logout?"
      : "Are you sure you want to delete this note?";

  const handleLogout = () => {
    props.setIsLoggedIn(false);
    props.setShowPopup(false);
    props.setLogout(true);
    props.setSignup(false);
  };

  const handleDelete = async () => {
    props.setShowPopup(false);
    await props.handleDeleteNote(props.noteId);
  };
  const handleCancel = () => {
    props.setShowPopup(false);
  };

  return (
    <div
      ref={props.ref}
      className={`fixed flex flex-col left-[20vw] items-center justify-around h-[30vh] w-[60vw] bg-indigo-500 rounded-2xl shadow-lg text-white p-4 m-3 border-3 border-indigo-900 mx-auto ${
        props.showPopup ? "z-10 top-[10vh] " : "top-[-10vh]  -z-10"
      } transition-all 500 ease-in-out`}
    >
      <div className="title">
        <span className="text-3xl font-medium">{title}</span>
      </div>
      <div className="message text-lg font-medium">
        <span>{message}</span>
      </div>
      <div className="buttons flex gap-4 justify-around items-center w-[50%]">
        <button
          className="bg-indigo-950 w-full h-10 rounded-lg hover:bg-indigo-800 transition-all 200 ease-in-out"
          onClick={props.popType === "logout" ? handleLogout : handleDelete}
        >
          Yes
        </button>
        <button
          className="bg-indigo-800 w-full h-10 rounded-lg hover:bg-indigo-950 transition-all 200 ease-in-out"
          onClick={handleCancel}
        >
          Cancle
        </button>
      </div>
    </div>
  );
};

export default Popup;
