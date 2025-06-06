import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import axios from "axios";
import {
  IoLockClosedOutline,
  IoEyeOffOutline,
  IoEyeOutline,
} from "react-icons/io5";

const Signup = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        props.handleAlert("Passwords do not match!", "error");
        return;
      }
      const data = {
        username: `${firstName} ${lastName}`,
        email: email,
        password: password,
      };
      console.log("Creating user:", data);
      const response = await axios.post("http://localhost:8000/users", data);
      console.log("User created:", response.data);
      props.handleAlert("User Created Successfully!", "success");
    } catch (error) {
      props.handleAlert("Error creating user!", "error");
      console.error("Error creating user:", error);
    }
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
    props.setIsLoggedIn(false);
    props.setSignup(false);
  };

  return (
    <div className="w-screen h-screen flex gap-10 justify-between items-center text-white">
      <div className="signup h-[90%] w-[45%] flex flex-col justify-center items-center gap-5 mx-auto p-20 pt-10 rounded-2xl">
        <div className="create w-full  flex justify-between items-center mb-5">
          <span className="text-4xl w-full flex justify-center">
            Create a New Account
          </span>
        </div>

        <div className="username flex w-full justify-between items-center gap-[20%]">
          <div className="first flex flex-col gap-2 w-full">
            <div className="input w-full border h-[6vh] flex justify-center items-center">
              <FaRegUser className="text-xl m-2" />
              <input
                type="text"
                className="h-full w-full focus:outline-0 text-xl"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className="last flex flex-col gap-2 w-full">
            <div className="input w-full border h-[6vh] flex justify-center items-center">
              <FaRegUser className="text-xl m-2" />
              <input
                type="text"
                className="h-full w-full focus:outline-0 text-xl"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="email flex flex-col gap-2 w-full">
          <div className="input w-full border h-[6vh] flex justify-center items-center">
            <MdAlternateEmail className="text-xl m-2" />
            <input
              type="text"
              className="h-full w-full focus:outline-0 text-xl"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="password flex flex-col gap-2 w-full">
          <div className="input w-full border h-[6vh] flex justify-center items-center">
            <IoLockClosedOutline className="text-xl m-2" />
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="h-full w-full focus:outline-0 text-xl"
              placeholder="Password"
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
        <div className="confirm flex flex-col gap-2 w-full">
          <div className="input w-full border h-[6vh] flex justify-center items-center">
            <IoLockClosedOutline className="text-xl m-2" />
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="h-full w-full focus:outline-0 text-xl"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
        <div className="submit">
          <button
            className="w-[20vw] h-[6vh] bg-white flex justify-center items-center text-black text-xl font-medium cursor-pointer hover:bg-gray-200"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="txt text-6xl  flex flex-col justify-center items-center w-[40%] h-full bg-white text-black gap-2">
        <span className="custom-kaushan">Nowted</span>
        <span className="text-lg">Notes, Just Smarter.</span>
        <span
          className="text-lg underline-offset-2 underline cursor-pointer"
          onClick={() => {
            console.log("Switching to login");
            props.setSignup(false);
            props.setIsLoggedIn(false);
          }}
        >
          Have an account?
        </span>
      </div>
    </div>
  );
};

export default Signup;
