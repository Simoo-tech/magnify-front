import axios from "axios";
import { BsTrash } from "react-icons/bs";

// delete account
export const DeleteMsg = ({ showMsg, setShowMsg, message, user }) => {
  const HandleDelete = async () => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}user/${user}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    window.location.reload();
    setShowMsg(false);
  };
  return (
    <div
      className={`${
        showMsg ? "block" : "hidden"
      } delete-account w-full h-full top-0 left-0 flex justify-center items-center absolute 
    before:absolute before:h-full before:w-full z-40 before:bg-black before:opacity-50 before:left-0 before:top-0`}
    >
      <div className="message gap-8 sm:w-11/12  md:h-3/6 sm:h-4/6 md:w-7/12 relative border-t-4 border-darkGrey bg-white rounded-xl z-10 flex items-center flex-col justify-center ">
        <BsTrash
          className="absolute -top-8 bg-red-500 rounded-full px-3 py-2 text-white"
          size={55}
        />
        <p className="text-2xl text-colorBlue1 capitalize font-bold">
          please confirm
        </p>
        <div className="confirm w-11/12 flex flex-col gap-3">
          <p className="text-lg w-full text-center leading-7 text-gray-400">
            <span className="font-bold capitalize mr-1">{message}</span>You will
            delete a user. If you want to continue , click
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
            onClick={HandleDelete}
            className="text-white bg-red-500 capitalize py-2 px-3 rounded-lg"
          >
            yes, delete it
          </button>
        </div>
      </div>
    </div>
  );
};
