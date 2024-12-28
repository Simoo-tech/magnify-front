import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import cookie from "react-cookies";
// icons
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { BsSortAlphaDown } from "react-icons/bs";
import { BiSortAlt2 } from "react-icons/bi";

// Components
import { LoadingData } from "../../components/LoadingData";
import { NotFoundInList } from "../../components/NotFoundInList";

// Constants
const serverPath = import.meta.env.VITE_APP_API_BASE;
const axiosHeader = { headers: { token: `${cookie.load("user_token")}` } };

const UsersTable = ({
  lang,
  search,
  setDeleteUser,
  page,
  setNextPage,
  setPopUp,
  navigate,
  setResult,
}) => {
  const [sort, setSort] = useState({ type: "" });
  const langDir = lang === "ar" ? "rtl" : "ltr";

  // Fetch user data
  const { isLoading, data: fetchUsers } = useQuery(
    ["fetchClients", page],
    () =>
      axios
        .get(`${serverPath}user?page=${page}`, axiosHeader)
        .then((res) => res.data),
    {
      onSuccess: (res) => {
        setNextPage(res.next);
      },
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const users = fetchUsers?.users;
  // Filter and sort users with useMemo
  const ShowUsers = useMemo(() => {
    return users
      ?.filter((user) =>
        search
          ? user?.fname?.toLowerCase().includes(search?.toLowerCase())
          : true
      )
      .sort((a, b) => {
        if (sort.type === "number") {
          return a.projectInfo?.length < b.projectInfo?.length ? 1 : -1;
        } else if (sort.type === "name") {
          return a.fname > b.fname ? 1 : -1;
        }
        return 0;
      })
      .map((user) => (
        <tr key={user._id} className="bg-white hover:bg-lightGreen ">
          <td className="p-2 capitalize truncate border-y border-primary-color1">
            {user.fname + " " + user.lname}
          </td>
          <td className="p-2 truncate border border-primary-color1">
            {user.email}
          </td>
          <td dir="ltr" className="p-2 truncate border-y border-primary-color1">
            {user.phone ? `+${user.phone}` : "none"}
          </td>
          <td className="p-3 text-center border border-primary-color1">
            {
              user.projectData.filter(
                (proj) => proj.projectOwner === user.userName
              ).length
            }
          </td>
          <td className="p-3 text-center border-y border-primary-color1">
            {
              user.projectData.filter(
                (proj) => proj.projectOwner !== user.userName
              ).length
            }
          </td>
          <td className="py-2 flex justify-center gap-5 sm:px-3 lg:px-0 border border-primary-color1">
            <button
              title="edit"
              className="py-2 px-3 bg-primary-color3 text-white flex justify-center items-center hover:bg-white hover:text-primary-color3 duration-200 rounded-lg"
              onClick={() => navigate(`${user.userName}/edit-user`)}
            >
              <MdOutlineModeEditOutline title="edit" />
            </button>
            <button
              title="delete"
              className="py-2 px-3 bg-red-500 text-white flex justify-center items-center hover:bg-white hover:text-red-500 duration-200 rounded-lg"
              onClick={() => {
                setPopUp(true);
                setDeleteUser(user);
              }}
            >
              <MdOutlineDeleteOutline title="delete" />
            </button>
          </td>
        </tr>
      ));
  }, [users, search, sort]);

  // Update result count
  useEffect(() => {
    setResult(ShowUsers?.length || 0);
  }, [ShowUsers, setResult]);

  // Handle sorting
  const handleSort = useCallback(
    (type) => {
      setSort((prevSort) => ({ type: prevSort.type === type ? "" : type }));
    },
    [sort]
  );

  const tableHead = [
    {
      text: lang === "ar" ? "الاسم" : "Name",
      sort: () => handleSort("name"),
      icon: <BsSortAlphaDown color="black" />,
    },
    {
      text: lang === "ar" ? "البريد الالكتروني" : "Email",
    },
    {
      text: lang === "ar" ? "رقم الهاتف" : "Phone No",
    },
    {
      text: lang === "ar" ? "مشاريعك" : "Owned projects",
      sort: () => handleSort("number"),
      icon: <BiSortAlt2 color="black" />,
    },
    {
      text: lang === "ar" ? "مشاريع اخري" : "Access projects",
    },
    {
      text: "",
    },
  ];

  return (
    <div
      id="users-table"
      className="w-full h-full flex items-start flex-col justify-start overflow-y-auto overflow-x-auto"
    >
      <table className="table sm:table-sm md:table-md lg:table-md border border-primary-color1">
        <thead>
          <tr className="bg-primary-color1 w-full text-lightGreen sticky top-0">
            {tableHead.map((list, i) => (
              <th
                key={i}
                className="font-normal lg:text-[14px] border-primary-color2 border"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="w-full truncate">{list.text}</span>
                  {list.sort && (
                    <button
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
        <tbody>{ShowUsers}</tbody>
      </table>
      {isLoading && <LoadingData />}
      {!isLoading && ShowUsers?.length < 1 && (
        <NotFoundInList
          color="#497B62"
          text="No user found"
          textStyle="text-primary-color1"
          border="true"
        />
      )}
    </div>
  );
};

export default React.memo(UsersTable);
