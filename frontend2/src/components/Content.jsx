import { CiCircleMore } from "react-icons/ci";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegFolder, FaRegCopy } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuBold, LuItalic, LuUnderline } from "react-icons/lu";
import Editor, { BtnBold, BtnItalic, Toolbar } from "react-simple-wysiwyg";
import { useEffect, useState } from "react";

const Content = (props) => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState();
  const [folder, setFolder] = useState("");

  useEffect(() => {
    if (props.currentNote) {
      setTitle(props.currentNote.title);
      setValue(props.currentNote.content);
      setDate(new Date(props.currentNote.updated_at).toLocaleDateString("en-US"));
      setFolder(props.currentNote.folder || "Personal");
    }
  }, [props.currentNote]);

  return (
    <div className="w-[55%] h-[100%] flex flex-col p-2 px-7  ">
      <div className="box1 mt-7 flex justify-between text-2xl font-medium">
        <input
          type="text"
          value={title}
          className="w-full focus:outline-0"
          onChange={(e) => setTitle(e.target.value)}
        />
        <CiCircleMore className="opacity-50" />
      </div>
      <div className="box2 flex mt-5 gap-10 items-center">
        <div className="date flex opacity-50 gap-5 items-center">
          <MdOutlineCalendarMonth className="text-2xl " />
          <span>Date</span>
        </div>
        <div className="value underline-offset-2 underline decoration-[1px]">
          {date}
        </div>
      </div>
      <div className="separator w-full h-[0.5px] mx-auto bg-neutral-600 m-3"></div>
      <div className="box3 flex gap-10 items-center">
        <div className="date flex opacity-50 gap-5 items-center">
          <FaRegFolder className="text-2xl " />
          <span>Folder</span>
        </div>
        <div className="value underline-offset-2 underline decoration-[1px]">
         {folder}
        </div>
      </div>
      <div className="separator w-full h-[0.5px] mx-auto bg-neutral-600 m-3"></div>

      {/* <div className="box4 flex justify-between items-center">
        <div className="left flex items-center gap-5 ">
          <div className="frame1 flex gap-10">
            <span>Paragraph</span>
            <MdKeyboardArrowDown className="text-2xl" />
          </div>
          <div className="frame2 flex gap-3">
            <span>16</span>
            <MdKeyboardArrowDown className="text-2xl" />
          </div>
          <div className="frame3 text-xl flex gap-2">
            <LuBold />
            <LuItalic />
            <LuUnderline />
          </div>
        </div>

        <div className="right pr-10 flex items-center">
          <FaRegCopy className="text-2xl opacity-50" />
        </div>
      </div>
      <div className="separator w-full h-[0.5px] mx-auto bg-neutral-600 m-3"></div>

      <div className="box5 max-h-[70vh] h-[70vh] w-full mt-5 flex flex-col overflow-y-scroll scrollbar">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum assumenda
        aliquam placeat. A, necessitatibus libero nisi laboriosam ipsum minus
        praesentium saepe aspernatur, repellat ex tempore. Illo quidem iste
        nobis quae amet tenetur est impedit odio, deleniti dolorem laborum
        cupiditate a explicabo?
        <br />
        <br /> Nulla et expedita veritatis. Aspernatur nisi voluptatibus
        exercitationem dolorem accusantium blanditiis, voluptatum veritatis vel
        enim, consequatur sequi quaerat! Velit sequi quis a veritatis molestiae
        ratione asperiores odio, iure harum sunt assumenda cum maiores! Totam
        inventore impedit consequatur, cum est facere neque alias ut magnam nam.
        Enim voluptas delectus magni quo adipisci alias recusandae nulla
        excepturi laudantium mollitia cum quasi quae numquam qui, id repellendus
        rerum nemo corrupti! Ea officiis atque, obcaecati aliquid sapiente
        minima maiores eveniet nisi, ad soluta delectus dicta! Dolores sunt
        itaque quo non commodi excepturi nulla ipsa pariatur recusandae?
        Voluptate consequuntur magnam ad quibusdam! Commodi placeat, quas dolor
        dicta odit unde tenetur eius!
        <br />
        <br /> Sit saepe officia fugit veritatis alias fugiat beatae ducimus
        voluptatem quisquam odio, repellendus unde qui aperiam aliquam dolorum
        delectus expedita deserunt recusandae. Inventore quae ex sint ipsum
        possimus, quod, recusandae quidem laudantium ipsam esse, iure eligendi
        dolores rem quaerat illum natus consequatur molestiae omnis
        necessitatibus. Deleniti perspiciatis ex veniam in dolores perferendis
        earum dolore vitae reiciendis beatae neque deserunt vero praesentium,
        aspernatur, culpa corporis aliquam! Unde perferendis minus quia dicta,
        repellendus eveniet voluptatum id eius nulla incidunt.
        <br />
        <br /> Ullam adipisci ipsa quia aliquid eveniet, modi sed. Aliquam
        ipsam, ut nulla quo autem beatae ipsum voluptatem maiores eveniet
        maxime. Porro necessitatibus ab earum cupiditate dolore nemo quos enim
        dolores natus et, commodi magnam, tempore officiis nesciunt quasi dolor
        modi, perferendis nulla unde doloribus illum quia odio! Consectetur
        dicta ex necessitatibus vitae rem quasi itaque, quod laudantium, iste
        autem ab minima perferendis repellat incidunt officia enim dolor
        doloribus quia provident sunt adipisci. Quas magni optio voluptates?
      </div> */}
      <div className="box4">
        <Editor
          value={value}
          onChange={(e) => setValue(e.target.value)}
          containerProps={{
            style: {
              background: "none",
              border: "none",
            },
          }}
          style={{ background: "none" }}
          className="ql-editor"
          // hideButtons = {["HTML mode"]}
        ></Editor>
      </div>
    </div>
  );
};

export default Content;
