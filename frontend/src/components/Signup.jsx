import React from "react";
import { useState } from "react";

const Signup = (props) => {
  const [repassword, setRepassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "repassword") {
      setRepassword(value);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (password !== repassword) {
      props.handleAlert("Passwords do not match!", "error");
      return;
    }
    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    props.setSignup(false);
    props.setNewUser(newUser);
    props.setUserName(email);
    props.setPassword(password);
    props.handleCreateUser(newUser)
    props.handleAlert("User Created Successfully!", "success");
  };

  return (
    <div className="h-[90vh] w-[100vw] flex justify-center items-center">
      <div className="box  w-[35%]  flex flex-col justify-between items-center rounded-2xl shadow-lg text-white p-4 m-3 border-3 border-white bg-indigo-500 mt-0">
        <div className="top pt-3">
          <span className="text-3xl font-medium"> Signup </span>
        </div>
        <div className="mid text-white flex flex-col w-full text-lg gap-4">
          <div className="username flex flex-col gap-2">
            <span>Username</span>
            <input
              type="text"
              placeholder="Username"
              className="w-full h-10 rounded-2xl p-2 outline-none decoration-white border-2 border-white text-xl focus:border-2 focus:outline-none focus:bg-indigo-400"
              value={username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="email flex flex-col gap-2">
            <span>Email</span>
            <input
              type="text"
              placeholder="Email"
              className="w-full h-10 rounded-2xl p-2 outline-none decoration-white border-2 border-white text-xl focus:border-2 focus:outline-none focus:bg-indigo-400"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="password flex flex-col">
            <div className="top flex justify-between items-center">
              <span>Password</span>
              <span className=" bg-indigo-500"></span>
            </div>

            <input
              type="password"
              placeholder="Password"
              className="w-full h-10 rounded-2xl p-2 outline-none decoration-white border-2 border-white text-xl focus:border-2 focus:outline-none focus:bg-indigo-400 my-2"
              value={password}
              name="password"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Re enter password"
              className="w-full h-10 rounded-2xl p-2 outline-none decoration-white border-2 border-white text-xl focus:border-2 focus:outline-none focus:bg-indigo-400 my-2"
              value={repassword}
              name="repassword"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="bottom flex justify-around items-center w-full my-5">
          <button
            className="bg-indigo-700 border-2 p-2 w-[20vh] rounded-2xl text-xl font-medium hover:bg-indigo-400 transition 200 ease-in-out cursor-pointer "
            onClick={handleClick}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
