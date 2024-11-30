import React, { useCallback, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import cookie from "react-cookies";
import axios from "axios";
/////// icons
import icon5 from "/assets/icon5.svg";
/////// components
import { Loading } from "../../components/Loading";
import { QR } from "../../components/Qr";
import { useLang } from "../../context/LangContext";
import { SecondaryBtn } from "../../components/Btns";
import { PopUp } from "../../components/PopUp";
import { HandleDelete } from "../../lib/DashboardReq";
import { InputSearch } from "../../components/inputSearch";
import { NotFound } from "../../components/NotFound";
/////// layout
import MainLayout from "../../MainLayout";
import UsersTable from "./UsersTable";

const user_cookies = cookie.load("user_token");
const serverPath = import.meta.env.VITE_APP_API_BASE;

// if user token expired

export function Dashboard() {
  const [deleteUser, setDeleteUser] = useState({});
  const [search, setSearch] = useState();
  const [popUp, setPopUp] = useState(false);
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(false);
  const [result, setResult] = useState();
  const { id } = useParams();
  // context
  const [lang] = useLang();
  const navigate = useNavigate();

  // fetch data
  const { isLoading, data: userData } = useQuery("fetchAdminUser", () =>
    axios.get(`${serverPath}user/${user_cookies}`).then((res) => res.data)
  );

  if (isLoading) {
    return <Loading />;
  }
  // user data
  const { fname, isAdmin } = userData;
  // check user
  if (id !== user_cookies || !isAdmin) {
    return <NotFound />;
  }
  const langDir = lang === "ar" && "rtl";

  return (
    <MainLayout>
      {popUp && (
        <PopUp
          iconImage={icon5}
          type="yes-no"
          noAction={() => setPopUp(!popUp)}
          yesAction={() => HandleDelete({ deleteUser, setPopUp })}
        >
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
        </PopUp>
      )}
      <section
        dir={langDir}
        className="container h-full max-w-full relative w-full justify-between flex flex-col items-center 
      gap-5"
      >
        <AdminTools
          fname={fname}
          lang={lang}
          navigate={navigate}
          search={search}
          setSearch={setSearch}
        />
        {
          <UsersTable
            navigate={navigate}
            lang={lang}
            search={search}
            setDeleteUser={setDeleteUser}
            setPopUp={setPopUp}
            page={page}
            setNextPage={setNextPage}
            setResult={setResult}
          />
        }
        {/* pagination */}
        <Pagination
          lang={lang}
          nextPage={nextPage}
          page={page}
          result={result}
          setPage={setPage}
        />
        {userData && <QR />}
      </section>
    </MainLayout>
  );
}

const AdminTools = ({ fname, lang, navigate, setSearch, search }) => (
  <div className="tools flex justify-between w-full items-center sm:flex-wrap gap-4">
    {/* admin name  */}
    <h3
      dir="ltr"
      id="user-welcome"
      className={`${
        lang === "ar" && "flex-row-reverse"
      } flex text-primary-color1 capitalize gap-2 font-bold
          sm:text-base
          md:text-lg
          lg:text-xl`}
    >
      {lang === "ar" ? " ,مرحبا" : "Hello, "}
      <span>{fname}</span>
    </h3>
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
    {
      <InputSearch
        autoFocus={true}
        onChangeHandle={useCallback(
          (e) => setSearch(e.target.value),
          [search, setSearch]
        )}
        search={search}
        setSearch={setSearch}
        placeholder={lang === "ar" ? "ابحث عن اسم" : "Search by name"}
      />
    }
  </div>
);

const Pagination = ({ setPage, nextPage, page }) => (
  <div className="join">
    <button
      disabled={page === 0}
      onClick={() => setPage((prev) => prev - 1)}
      className="join-item btn !bg-primary-color1 !text-primary-color4 disabled:!bg-primary-color1/50"
    >
      «
    </button>
    <button className="join-item btn !bg-primary-color1 !text-white">
      {page + 1}
    </button>
    <button
      disabled={!nextPage}
      onClick={() => setPage((prev) => prev + 1)}
      className="join-item btn !bg-primary-color1 !text-primary-color4 disabled:!bg-primary-color1/50 "
    >
      »
    </button>
  </div>
);
