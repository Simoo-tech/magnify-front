import React, { useCallback, useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useQuery } from "react-query";
import cookie from "react-cookies";
import axios from "axios";
/////// components
import { Loading } from "../../components/Loading";
import { QR } from "../../components/Qr";
import { useLang } from "../../context/LangContext";
import { SecondaryBtn } from "../../components/Btns";
import { PopUp } from "../../components/PopUp";
import { HandleDelete } from "../../lib/DashboardReq";
import { InputSearch } from "../../components/inputSearch";
import { NotFound } from "../../pages/NotFound";
/////// layout
import MainLayout from "../../Layout/MainLayout";
import UsersTable from "./UsersTable";
import { preload } from "react-dom";

const user_cookies = cookie.load("user_token");
const serverPath = import.meta.env.VITE_APP_API_BASE;

export function Dashboard() {
  preload("/assets/icon5.svg", {
    as: "image",
  });

  const [deleteUser, setDeleteUser] = useState({});
  const [page, setPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [result, setResult] = useState();
  const { id } = useParams();
  const savedPage = searchParams.get("page") || 0;

  // context
  const { lang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to set a specific parameter
  const setPageParam = useCallback(
    (page) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", page);
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    // Ensure the URL always includes the `page` parameter
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("page", savedPage);
      return newParams;
    });

    setPage(parseInt(searchParams.get("page")));
  }, [location.pathname, searchParams, setPageParam, savedPage]);

  // fetch data
  const { isLoading, data: userData } = useQuery(
    "fetchAdminUser",
    () =>
      axios
        .get(`${serverPath}user/fetchUser/${user_cookies}`)
        .then((res) => res.data),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <Loading />;
  }
  // check user
  if (id !== user_cookies || !userData?.isAdmin) {
    return <NotFound />;
  }

  return (
    <MainLayout overFlow="hidden" type="dashboard">
      {popUp && (
        <PopUp
          iconImage="/assets/icon5.svg"
          type="yes-no"
          noAction={() => setPopUp(!popUp)}
          yesAction={() => HandleDelete({ deleteUser, setPopUp })}
        >
          <div className="w-full text-center lowercase rounded-xl gap-4 flex flex-col relative">
            <p>
              <b>{userData?.fname}</b>
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
        id="content"
        className="relative w-full flex flex-col items-center container max-w-full gap-5"
      >
        <AdminTools
          fname={userData?.fname}
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
          isLoading={isLoading}
          setPageParam={setPageParam}
          searchParams={searchParams}
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

const Pagination = ({
  nextPage,
  page,
  isLoading,
  setPageParam,
  searchParams,
}) => (
  <div className="join">
    <button
      disabled={isLoading || page === 0}
      onClick={() => {
        setPageParam(parseInt(searchParams.get("page")) - 1);
      }}
      className="join-item btn !bg-primary-color1 !text-primary-color4 disabled:!bg-primary-color1/50"
    >
      «
    </button>
    <button className="join-item btn !bg-primary-color1 !text-white">
      {page + 1}
    </button>
    <button
      disabled={isLoading || !nextPage}
      onClick={() => {
        setPageParam(parseInt(searchParams.get("page")) + 1);
      }}
      className="join-item btn !bg-primary-color1 !text-primary-color4 disabled:!bg-primary-color1/50 "
    >
      »
    </button>
  </div>
);
