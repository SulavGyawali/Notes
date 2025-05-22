import React from "react";
import { useState, useEffect } from "react";

const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      props.setEmail(value);
    } else if (name === "password") {
      props.setPassword(value);
    }
  };

  return (
    <div className="h-[90vh] w-[100vw] flex justify-center items-center">
      <div className="box  w-[35%]  flex flex-col justify-between items-center rounded-2xl shadow-lg text-white p-4 m-3 border-3 border-white bg-indigo-500">
        <div className="top pt-3">
          <span className="text-3xl font-medium"> Login </span>
        </div>
        <div className="mid text-white flex flex-col w-full text-lg gap-4">
          <div className="email">
            <span>Email</span>
            <input
              type="text"
              placeholder="Email"
              className="w-full h-10 rounded-2xl p-2 outline-none decoration-white border-2 border-white text-xl focus:border-2 focus:outline-none focus:bg-indigo-400"
              value={props.email}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="password flex flex-col">
            <div className="top flex justify-between items-center">
              <span>Password</span>
              <span className=" bg-indigo-500">
                <label className="show flex ml-5 items-center gap-2 cursor-pointer bg-indigo-500">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="w-2 h-2 rounded-full appearance-none bg-indigo-200 checked:ring-3 checked:ring-indigo-700 cursor-pointer"
                    onClick={handleShowPassword}
                  />
                  <span
                    className={`${
                      showPassword ? "text-white" : "text-indigo-200"
                    }`}
                  >
                    Show Password
                  </span>
                </label>
              </span>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-10 rounded-2xl p-2 outline-none decoration-white border-2 border-white text-xl focus:border-2 focus:outline-none focus:bg-indigo-400"
              value={props.password}
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="bottom flex justify-around items-center w-full my-5">
          <button className="bg-indigo-700 border-2 p-2 w-[20vh] rounded-2xl text-xl font-medium hover:bg-indigo-400 transition 200 ease-in-out cursor-pointer " onClick={()=>{props.handleLogin()}}>
            Login
          </button>
          <button
            className="bg-indigo-400 border-2 p-2 w-[20vh] rounded-2xl text-xl font-medium hover:bg-indigo-700 transition 200 ease-in-out cursor-pointer"
            onClick={() => {
              props.setSignup(true);
            }}
          >
            New User?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
