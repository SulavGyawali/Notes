import React from "react";
import { FiUser } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
const Login = (props) => {
  const handleLogin = () => {
    props.setIsLoggedIn(true);
  };
  return (
    <div className="w-screen h-screen flex flex-col gap-10 justify-center items-center text-white">
      <div className="txt text-6xl custom-kaushan">Nowted</div>
      <div className="login flex flex-col gap-3">
        <div className="email w-[20vw] h-[5vh] border flex justify-between items-center">
          <FiUser className="text-2xl ml-2" />
          <input
            type="text"
            className="w-full h-full focus:outline-0 p-2"
            placeholder="EMAIL"
          />
        </div>
        <div className="password w-[20vw] h-[5vh]  border flex justify-between items-center">
          <IoLockClosedOutline className="text-2xl ml-2" />
          <input
            type="text"
            className="w-full h-full focus:outline-0 p-2"
            placeholder="PASSWORD"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button
          className="w-[20vw] h-[5vh] bg-white flex justify-center items-center text-black text-xl font-medium cursor-pointer hover:bg-gray-200"
          onClick={() => handleLogin()}
        >
          <span>LOGIN</span>
        </button>
        <span className="flex justify-end opacity-50">Forgot password?</span>
      </div>
    </div>
  );
};

export default Login;
