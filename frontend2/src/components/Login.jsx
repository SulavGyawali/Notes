import React from "react";
import { FiUser } from "react-icons/fi";
import {
  IoLockClosedOutline,
  IoEyeOffOutline,
  IoEyeOutline,
} from "react-icons/io5";
import axios from "axios";
const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleLogin = async () => {
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        data
      );
      props.setToken(response.data.access_token);
      props.setTokenType(response.data.token_type);
      props.setRefreshToken(response.data.refresh_token);
      props.setIsLoggedIn(true);
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      // handleAlert("Logged in Successfully!", "success");
      setEmail("");
      setPassword("");
    } catch (error) {
      // handleAlert("Invalid credentials!", "error");
      console.error("Error logging in:", error);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col gap-10 justify-center items-center text-white">
      <div className="txt text-6xl  flex flex-col justify-center items-center gap-2">
        <span className="custom-kaushan">Notwed</span>
        <span className="text-lg">Notes, Just Smarter.</span>
      </div>
      <div className="login flex flex-col gap-3">
        <div className="email w-[20vw] h-[5vh] border flex justify-between items-center">
          <FiUser className="text-2xl ml-2" />
          <input
            type="text"
            className="w-full h-full focus:outline-0 p-2"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password w-[20vw] h-[5vh]  border flex justify-between items-center">
          <IoLockClosedOutline className="text-2xl ml-2" />
          <input
            type={`${showPassword ? "text" : "password"}`}
            className="w-full h-full focus:outline-0 p-2"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <IoEyeOutline
              className="text-2xl mr-2 cursor-pointer opacity-50 hover:opacity-100"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEyeOffOutline
              className="text-2xl mr-2 cursor-pointer opacity-50 hover:opacity-100"
              onClick={() => setShowPassword(true)}
            />
          )}
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
