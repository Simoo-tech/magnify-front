import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import cookie from "react-cookies";
import axios from "axios";
/////// icons
import { BiSortAlt2 } from "react-icons/bi";
import { BsSortAlphaDown } from "react-icons/bs";
import icon5 from "/assest/icon5.svg";
import {
  MdOutlineDeleteOutline,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineModeEditOutline,
} from "react-icons/md";
/////// components
import { Loading } from "../../component/Loading";
import { QR } from "../../component/Qr";
import { useLang } from "../../context/LangContext";
import { SecondaryBtn } from "../../component/Btns";
import { LoadingData } from "../../component/LoadingData";
import { PopUp } from "../../component/PopUp";
import { HandleDelete } from "../../lib/DashboardReq";
import { InputSearch } from "../../component/inputSearch";
import { NotFound } from "../../component/NotFound";
import { NotFoundInList } from "../../component/NotFoundInList";
/////// layout
import MainLayout from "../../MainLayout";

const user_cookies = cookie.load("user_token");
const serverPath = import.meta.env.VITE_APP_API_BASE;
const header = { headers: { token: `${user_cookies}` } };

// if user token expired

export function Dashbaord() {
  const [deleteUser, setDeleteUser] = useState({});
  const [search, setSearch] = useState();
  const [userData, setUserData] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState();
  const [nextPage, setNextPage] = useState(false);
  const [result, setResult] = useState();
  const { id } = useParams();
  // context
  const [lang] = useLang();
  const navigate = useNavigate();

  // fetch data
  const { isLoading, error } = useQuery(
    "fetchAdminUser",
    () => {
      return axios.get(`${serverPath}user/${user_cookies}`);
    },
    {
      onSuccess: (res) => setUserData(res.data),
    }
  );

  if (isLoading) {
    return <Loading />;
  }
  // user data
  const { fname, isAdmin } = userData;
  // check user
  if (error || id !== user_cookies || !isAdmin) {
    return <NotFound />;
  }
  const langDir = lang === "ar" && "rtl";

  return (
    <MainLayout>
      {popUp && (
        <PopUp
          iconImage={icon5}
          text={
            <div className="w-full text-center lowercase rounded-xl gap-4 flex flex-col relative">
              <p className="text-[20px]">
                <b>{fname}</b>
                {lang === "ar"
                  ? "هل أنت متأكد أنك تريد الحذف؟"
                  : " Are you sure you want to delete "}
                <b className="mx-1">{deleteUser?.fname}</b>
              </p>
              <p className="text-base">
                {lang === "ar"
                  ? "لا يمكن التراجع عن هذا الإجراء"
                  : "This action can’t be undone"}
              </p>
            </div>
          }
          type="yes-no"
          noAction={() => setPopUp(!popUp)}
          yesAction={() => HandleDelete({ deleteUser, setPopUp })}
        />
      )}
      <section
        dir={langDir}
        className="container h-full max-w-full relative w-full py-5 justify-start flex flex-col items-center
        sm:gap-5
        md:gap-10  "
      >
        <>
          {/* admin tools  */}
          <div className="tools flex justify-between w-full items-center sm:flex-wrap gap-4">
            {/* admin name  */}
            <h3
              dir="ltr"
              id="user-welcome"
              className={`${
                lang === "ar" && "flex-row-reverse"
              } flex text-primary-color1 capitalize gap-2 font-bold
              sm:text-base
              md:text-lg`}
            >
              {lang === "ar" ? " ,مرحبا" : "Hello, "}
              <span>{fname}</span>
            </h3>
            {/* create user */}
            <SecondaryBtn
              text={lang === "ar" ? "انشاء مستخدم" : "Create new user"}
              action={() => navigate("create-user")}
              type="button"
              name="create-user"
              style="flex items-center gap-2 bg-primary-color1 border-primary-color1 
              sm:!px-4 sm:py-2 sm:text-xs sm:w-full sm:order-3
              md:text-sm md:px-5 md:w-fit md:order-2      
              lg:order-3   
              hover:border-primary-color1"
            />
            {/* input search */}
            {
              <InputSearch
                autoFocus={true}
                onChangeHandle={(e) => setSearch(e.target.value)}
                search={search}
                setSearch={setSearch}
                placeholder={lang === "ar" ? "ابحث عن اسم" : "Search by name"}
              />
            }
          </div>
          {/* users table */}
          {
            <Table
              lang={lang}
              search={search}
              navigate={navigate}
              setDeleteUser={setDeleteUser}
              setPopUp={setPopUp}
              page={page}
              users={users}
              setUsers={setUsers}
              setNextPage={setNextPage}
              setResult={setResult}
            />
          }
          {/* pagination */}
          <div dir="ltr" id="pagination" className="flex items-center gap-5">
            <SecondaryBtn
              action={() => setPage((prev) => prev - 1)}
              text={<MdOutlineKeyboardArrowLeft size={20} />}
              style="!p-2 !rounded-lg !border-none"
              disabled={page === 0}
            />
            <span>{page + 1}</span>
            <SecondaryBtn
              disabled={!nextPage}
              action={() => setPage((prev) => prev + 1)}
              text={<MdOutlineKeyboardArrowRight size={20} />}
              style="!p-2 !rounded-lg !border-none"
            />
            <span>
              {lang === "ar" ? "عدد:" : "result:"} {result}
            </span>
          </div>
        </>
        {/* Qr code */}
        {userData && <QR />}
      </section>
      <Outlet />
    </MainLayout>
  );
}

const Table = ({
  lang,
  search,
  navigate,
  setDeleteUser,
  page,
  users,
  setUsers,
  setNextPage,
  setPopUp,
  setResult,
}) => {
  const [sort, setSort] = useState({ type: "" });
  const langDir = lang === "ar" && "rtl";
  // fetch user data
  const { isLoading } = useQuery(
    ["fetchClients", page],
    () => {
      return axios.get(`${serverPath}user?page=${page}`, header);
    },
    {
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
      onSuccess: (res) => {
        setUsers(res.data.users);
        setNextPage(res.data.next);
      },
    }
  );

  // user lists
  const ShowUsers = users
    // filter
    ?.filter((user) =>
      search ? user?.fname?.toLowerCase().includes(search?.toLowerCase()) : user
    ) // sort
    .sort((a, b) => {
      if (sort.type === "number") {
        return a.projectInfo < b.projectInfo ? 1 : -1;
      } else if (sort.type === "name") {
        return a.fname > b.fname ? 1 : -1;
      }
    })
    .map((user) => {
      return (
        <tr
          className="bg-white hover:bg-lightGreen border-primary-color2 border-2
          sm:text-xs
          md:text-sm"
          key={user._id}
        >
          {/* name */}
          <td
            className="p-2 capitalize truncate  border-primary-color2 border-2"
            id="name"
          >
            {user.fname + " " + user.lname}
          </td>
          {/* email */}
          <td
            className="p-2 truncate border-primary-color2 border-2"
            id="email"
          >
            {user.email}
          </td>
          {/* phone no */}
          <td
            dir={langDir}
            className="p-2 truncate  border-primary-color2 border-2"
            id="phone-number"
          >
            +{user.phone}
          </td>
          {/* projects */}
          <td
            className="p-3 text-center border-primary-color2 border-2 "
            id="projects"
          >
            {user.projectInfo.length}
          </td>
          {/* delete and edit buttons */}
          <td
            className="border-primary-color2 py-2 flex justify-center gap-5
          sm:px-3
          lg:px-0"
          >
            <button
              title="edit"
              id="focus-btn"
              className="py-2 px-3 bg-blue-900 text-white flex justify-center items-center
              hover:bg-white hover:text-blue-900 duration-200 
              lg:rounded-2xl
              md:rounded-xl
              sm:rounded-lg
              "
              onClick={() => {
                navigate(`${user._id}/edit-user`);
              }}
            >
              <MdOutlineModeEditOutline
                title="edit"
                id="edit-user"
                className="sm:text-sm md:text-base"
              />
            </button>
            <button
              title="delete"
              className="py-2 px-3 bg-red-500 text-white flex justify-center items-center
              hover:bg-white hover:text-red-500 duration-200 
              lg:rounded-2xl
              md:rounded-xl
              sm:rounded-lg
              "
              id="focus-btn"
              onClick={() => {
                setPopUp(true);
                setDeleteUser(user);
              }}
            >
              <MdOutlineDeleteOutline
                title="delete"
                id="delete-user"
                className="sm:text-sm md:text-base"
              />
            </button>
          </td>
        </tr>
      );
    });

  const tableHead = [
    {
      text: lang === "ar" ? "الاسم" : "Name",
      sort: () => setSort({ type: "name" }),
      icon: <BsSortAlphaDown color="black" />,
    },
    {
      text: lang === "ar" ? "اليريد الالكتروني" : "Email",
    },
    {
      text: lang === "ar" ? "رقم الهاتف" : "  Phone No",
    },
    {
      text: lang === "ar" ? " عدد المشاريع" : "No of projects",
      sort: () => setSort({ type: "number" }),
      icon: <BiSortAlt2 color="black" />,
    },
    {
      text: "",
    },
  ];

  useEffect(() => {
    if (ShowUsers && ShowUsers?.length >= 1) {
      setResult(ShowUsers?.length);
    } else if (!ShowUsers) {
      setResult(users?.length);
    } else {
      setResult(0);
    }
  });

  return (
    <div
      id="users-table"
      className="w-full h-full flex items-start flex-col justify-start overflow-auto 
      sm:max-h-[420px]"
    >
      {!isLoading && (
        <table
          dir={langDir}
          id="users"
          className="table-auto border-2 border-primary-color2 "
        >
          {/* tablde header */}
          <thead>
            <tr className="bg-primary-color1 w-full text-lightGreen sticky top-0">
              {tableHead.map((list, i) => (
                <th
                  key={i}
                  className="py-4 px-3 font-normal border-2 border-primary-color2 
              sm:text-xs
              md:text-sm"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="w-full truncate">{list.text}</span>
                    {list.sort && (
                      <button
                        id="focus-btn"
                        className="bg-white rounded-lg p-1 hover:bg-gray-300 duration-300"
                        onClick={list.sort}
                      >
                        {list.icon}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {/* tablde body */}
          <tbody>{ShowUsers}</tbody>
        </table>
      )}
      {isLoading && <LoadingData />}
      {!isLoading && ShowUsers?.length < 1 && (
        <NotFoundInList
          color="#497B62"
          text="no user found"
          textStyle="text-primary-color1"
          border="true"
          height="100%"
        />
      )}
    </div>
  );
};
