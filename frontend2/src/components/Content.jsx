import { CiCircleMore } from "react-icons/ci";

const Content = () => {
  return (
    <div className="w-[55%] h-[100%] flex flex-col p-2 px-7  ">
      <div className="box1 mt-7 flex justify-between text-3xl font-medium">
        <span>Reflection on the Month of June</span>
        <CiCircleMore className="opacity-50" />
      </div>
      <div className="box2 flex mt-5">
<div className="date"></div>
<div className="value"></div>
      </div>
      <div className="box3"></div>
      <div className="box4"></div>
      <div className="box5"></div>
    </div>
  );
};

export default Content;
