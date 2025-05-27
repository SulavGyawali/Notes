import React from "react";
import { FaRegUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import {
  IoLockClosedOutline,
  IoEyeOffOutline,
  IoEyeOutline,
} from "react-icons/io5";

const Signup = () => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // save the file to ../assets/users_profiles
        

        console.log("Image uploaded:", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <div className="w-screen h-screen flex gap-10 justify-between items-center text-white">
      <div className="txt text-6xl  flex flex-col justify-center items-center w-[40%] h-full bg-white text-black gap-2">
        <span className="custom-kaushan">Notwed</span>
        <span className="text-lg">Notes, Just Smarter.</span>
      </div>
      <div className="signup h-[90%] w-[45%] flex flex-col  items-center gap-5 mx-auto p-20 pt-10 rounded-2xl">
        <div className="create w-full  flex justify-between items-center mb-5">
          <span className="text-4xl w-full">Create New Account</span>
          <div className="flex flex-col items-center gap-2">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center border-2 border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100 w-[10vw] h-[7vh]"
            >
              <p className="flex flex-col justify-center items-center text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and
                drop
              </p>

              <input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
            <span className="text-lg opacity-50">Profile Picture</span>
          </div>
        </div>

        <div className="username flex w-full justify-between items-center gap-[20%]">
          <div className="first flex flex-col gap-2 w-full">
            <span className="opacity-50 text-xl">First Name</span>
            <div className="input w-full border h-[6vh] flex justify-center items-center">
              <FaRegUser className="text-xl m-2" />
              <input
                type="text"
                className="h-full w-full focus:outline-0 text-xl"
              />
            </div>
          </div>
          <div className="last flex flex-col gap-2 w-full">
            <span className="opacity-50 text-xl">Last Name</span>
            <div className="input w-full border h-[6vh] flex justify-center items-center">
              <FaRegUser className="text-xl m-2" />
              <input
                type="text"
                className="h-full w-full focus:outline-0 text-xl"
              />
            </div>
          </div>
        </div>
        <div className="email flex flex-col gap-2 w-full">
          <span className="opacity-50">Email</span>
          <div className="input w-full border h-[6vh] flex justify-center items-center">
            <MdAlternateEmail className="text-xl m-2" />
            <input
              type="text"
              className="h-full w-full focus:outline-0 text-xl"
            />
          </div>
        </div>
        <div className="password flex flex-col gap-2 w-full">
          <span className="opacity-50">Password</span>
          <div className="input w-full border h-[6vh] flex justify-center items-center">
            <IoLockClosedOutline className="text-xl m-2" />
            <input
              type="text"
              className="h-full w-full focus:outline-0 text-xl"
            />
            <IoEyeOutline className="text-xl m-2" />
          </div>
        </div>
        <div className="confirm flex flex-col gap-2 w-full">
          <span className="opacity-50">Password</span>
          <div className="input w-full border h-[6vh] flex justify-center items-center">
            <IoLockClosedOutline className="text-xl m-2" />
            <input
              type="text"
              className="h-full w-full focus:outline-0 text-xl"
            />
            <IoEyeOutline className="text-xl m-2" />
          </div>
        </div>
        <div className="submit">
          <button className="w-[20vw] h-[6vh] bg-white flex justify-center items-center text-black text-xl font-medium cursor-pointer hover:bg-gray-200">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
