import React from "react";

const Alert = (props) => {
  return (
    <div
      className={`fixed  ${
        props.alertType == "success" ? "bg-green-200" : "bg-red-200"
      } text-white p-4 rounded shadow-lg w-[50vw] h-[8vh] flex items-center justify-center z-50 mx-[25vw] my-10 ${props.showAlert ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
    >
      <span className="text-black font-medium text-3xl ">
        {props.alertMessage}
      </span>
    </div>
  );
};

export default Alert;
