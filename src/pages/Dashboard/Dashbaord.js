import React, { Suspense, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/bootstrap.css";
import { LanguageCon } from "../../Context";
import { useCookies } from "react-cookie";
import { Oval } from "react-loader-spinner";
import { AiOutlineUserAdd } from "react-icons/ai";
import "../../App.css";
import { QR } from "../../component/Qr";
import { DeleteMsg } from "../../component/DeleteMsg";
import { CheckUser, GetUsers } from "../../functions/DashboardReq";
import { MdDelete, MdEdit } from "react-icons/md";
import { Loading } from "../../component/Loading";

export default function Dashbaord() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showMsg, setShowMsg] = useState(false);
  const [deleteUser, setDeleteUser] = useState();

  // context
  const { lang } = useContext(LanguageCon);

  const navigate = useNavigate();

  // user cookies
  const [cookies] = useCookies(["user_token"]);

  // get and check user id
  const user = cookies.user_token;

  // check if admin
  useEffect(() => {
    CheckUser({ navigate, user });
    GetUsers({ setLoading, setUsers });
  }, [user, navigate]);

  // delete user
  const DeleteUserMsg = () => {
    setShowMsg(!showMsg);
  };

  // user lists
  const ShowUsers = users.map((user) => {
    return (
      <tr className="bg-white border-2 " key={user._id}>
        <td
          className="sm:text-sm lg:text-lg border-2 py-2 px-2 capitalize"
          id="name"
        >
          {user.fname + " " + user.lname}
        </td>
        <td
          className="sm:text-sm lg:text-lg border-2 py-2 px-2 truncate"
          id="email"
        >
          {user.email}
        </td>
        <td
          className="sm:text-sm lg:text-lg border-2 py-2 px-2 truncate"
          id="email"
        >
          +{user.phone}
        </td>
        <td
          className="sm:text-sm lg:text-lg border-2 py-2 px-2 text-center"
          id="projects"
        >
          {user.projectInfo.length}
        </td>
        <td className="py-2 px-3 flex items-center gap-8 justify-center">
          <span className="text-center text-xs flex flex-col items-center text-gray-600">
            <MdEdit
              onClick={() => navigate(`${user._id}/edit-user`)}
              id="edit-user"
              size={23}
              color="blue"
            />
            {lang === "ar" ? "تعديل" : "Edit"}
          </span>
          <span className="text-center text-xs flex flex-col items-center text-gray-600">
            <button
              onClick={() => {
                DeleteUserMsg(user);
                setDeleteUser(user._id);
              }}
            >
              <MdDelete id="delete-user" size={23} color="red" />
            </button>
            {lang === "ar" ? "حذف" : "Delete"}
          </span>
        </td>
      </tr>
    );
  });
  return (
    <>
      <DeleteMsg
        showMsg={showMsg}
        setShowMsg={setShowMsg}
        message={`${user.fname}`}
        user={deleteUser}
      />
      <section className="section-h container max-w-[97%] relative w-full py-5 flex justify-center">
        <div className=" w-full h-full flex flex-col gap-5 items-center">
          <div className="tools flex justify-between w-full items-center">
            <h3
              id="user-welcome"
              className={`${
                lang === "ar" && "flex-row-reverse"
              } flex sm:text-lg md:text-3xl text-white capitalize gap-2 font-bold`}
            >
              {lang === "ar" ? " ,مرحبا" : "Hello, "}
              <span>{user.fname}</span>
            </h3>
            <div className="flex gap-3 items-center">
              {/* <button
                id="download-report"
                onClick={DownloadReport}
                className={`${
                  lang === "ar" && "flex-row-reverse"
                } flex py-2 sm:px-2 md:px-6 rounded-lg items-center gap-2 bg-white `}
              >
                {lang === "ar" ? "تحميل تقرير" : "Download Report"}
                <TbReportSearch size={20} />
              </button> */}
              <button
                id="create-user"
                onClick={() => navigate("create-user")}
                className={`${
                  lang === "ar" && "flex-row-reverse"
                } flex py-2 sm:px-2 md:px-6 rounded-lg items-center gap-2 bg-white `}
              >
                {lang === "ar" ? "انشاء مستخدم" : "Create new user"}
                <AiOutlineUserAdd size={20} />
              </button>
            </div>
          </div>
          <div
            id="users-table"
            className={`w-full h-full flex ${
              loading
                ? "items-center justify-center"
                : "items-start justify-start"
            } overflow-scroll`}
          >
            {loading ? (
              <Oval />
            ) : (
              <table id="users" className="w-full h-fit">
                <thead className="bg-darkGrey text-white border-2 border-[#c9c9c9]  ">
                  <tr>
                    <th className="sm:text-sm lg:text-lg text-start py-2 px-2 w-2/12 font-normal">
                      {lang === "ar" ? "الاسم" : "Name"}
                    </th>
                    <th className="sm:text-sm lg:text-lg text-start border-2 border-[#c9c9c9] py-2 px-2 w-3/12 font-normal">
                      {lang === "ar" ? "الايميل" : "Email"}
                    </th>
                    <th className="sm:text-sm lg:text-lg text-start border-2 border-[#c9c9c9] py-2 px-2 w-2/12 font-normal">
                      {lang === "ar" ? "رقم الهاتف" : "  Phone No"}
                    </th>
                    <th className="sm:text-sm lg:text-lg text-start border-2 border-[#c9c9c9] py-2 px-2 w-1/12 font-normal">
                      {lang === "ar" ? "عدد المشاريع" : "No of projects"}
                    </th>
                    <th className="sm:text-sm lg:text-lg text-start py-2 px-2 w-1/12 font-normal"></th>
                  </tr>
                </thead>
                <tbody>{ShowUsers}</tbody>
              </table>
            )}
          </div>
        </div>
        <Suspense fallback={<Loading />}>
          <Outlet  />
        </Suspense>
        {user && <QR />}
      </section>
    </>
  );
}
