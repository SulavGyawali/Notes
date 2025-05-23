import React from "react";
import { LuPencil } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";

const Menu = () => {
  return (
    <div className="border w-[20%] h-[100vh] flex flex-col p-2 pt-7">
      <div className="box1 w-full font px-3 flex justify-between items-center">
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
      <div className="box2 "></div>
      <div className="box3 "></div>
      <div className="box4"></div>
      <div className="box5"></div>
    </div>
  );
};

export default Menu;
