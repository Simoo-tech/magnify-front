import { BsTrash } from "react-icons/bs";
import { HandleDelete } from "../functions/DashboardReq";

// delete account
export const DeleteMsg = ({ showMsg, setShowMsg, message, user }) => {
  return (
    <div
      className={`${
        showMsg ? "block" : "hidden"
      } delete-account w-full h-full top-0 left-0 flex justify-center items-center absolute 
    before:absolute before:h-full before:w-full z-40 before:bg-black before:opacity-50 before:left-0 before:top-0`}
    >
      <div
        className="message gap-8 sm:w-11/12 md:w-9/12 lg:w-5/12 h-fit py-10 relative border-t-4 border-darkGrey
      bg-white rounded-xl z-10 flex items-center flex-col justify-center "
      >
        <BsTrash
          className="absolute -top-8 bg-red-500 rounded-full px-3 py-2 text-white"
          size={52}
        />
        <p className="sm:text-xl lg:text-2xl text-colorBlue1 capitalize font-bold">
          please confirm
        </p>
        <div className="confirm w-11/12 flex flex-col gap-3">
          <p className=" sm:text-sm lg:text-lg w-full text-center leading-7 text-gray-400">
            <span className="font-bold capitalize mr-1">{message}</span>You will
            delete a user. If you want to continue, click
            {<span className="font-bold ml-1">Yes</span>}. If you do not want,
            click
            {<span className="font-bold ml-1">Cancel</span>}
          </p>
        </div>
        <div className="btn flex gap-4">
          <button
            onClick={() => {
              setShowMsg(false);
            }}
            className="text-white bg-gray-600 capitalize py-2 px-3 rounded-lg"
          >
            cancel
          </button>
          <button
            onClick={(e) => {
              HandleDelete({ user, setShowMsg });
            }}
            className="text-white bg-red-500 capitalize py-2 px-3 rounded-lg"
          >
            yes, delete it
          </button>
        </div>
      </div>
    </div>
  );
};
