import React, { useEffect, useState } from "react";
import "../App.css";
import image from "../assest/ava1.webp";
import { FaPlus, FaUserEdit } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { IoIosArrowBack } from "react-icons/io";
export const Dashbaord = () => {
  const navigate = useNavigate();

  return (
    <section className="dashboard bg-color1 w-full flex justify-center py-10 relative">
      <div className="container flex justify-evenly flex-col items-center">
        <div className="admin-info flex flex-col  items-center gap-4">
          <img src={image} alt="admin-img" className="rounded-lg w-[120px]" />
          <p className="text-2xl text-white capitalize">name</p>
        </div>
        <div className="btns flex gap-10 w-full justify-center">
          <div className="btn w-2/12 flex flex-col gap-3 items-center">
            <label
              htmlFor="create-user"
              className="text-2xl text-white font-bold capitalize"
            >
              create user
            </label>
            <button
              onClick={() => navigate("/md-admin/create-user")}
              name="create-user"
              id="create-user"
              className="text-white text-6xl border-2 border-white w-full h-[200px]
          flex justify-center items-center py-5 px-10 rounded-2xl "
            >
              <FaPlus />
            </button>
          </div>
          <div className="btn w-2/12 flex flex-col gap-3 items-center">
            <label
              htmlFor="edit-user"
              className="text-2xl text-white font-bold capitalize"
            >
              edit user
            </label>
            <button
              name="edit-user"
              id="edit-user"
              className="text-white text-6xl border-2 border-white w-full h-[200px]
          flex justify-center items-center py-5 px-10 rounded-2xl "
            >
              <FaUserEdit />
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export const CreateUser = () => {
  const [animation, setAnimation] = useState(false);
  const [data, setData] = useState({});
  const [phone, setPhone] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setAnimation(true);
  }, []);
  // handle change data
  const HandleChnage = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  console.log(data);
  return (
    <div
      className={`create-user w-full bg-color1 absolute flex justify-center items-center pt-5 ${
        animation ? "top-0" : "top-96"
      } left-0 duration-200 ease-linear`}
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute left-0 w-[150px] capitalize flex items-center text-white text-xl h-full before:duration-200 ease-in
        before:absolute before:bg-black before:h-screen -top-[33px] before:w-full hover:before:opacity-70 before:z-0 before:opacity-0"
      >
        <div className="relative z-20 flex items-center w-full justify-center">
          <IoIosArrowBack />
          <p>home</p>
        </div>
      </button>
      <div className="container flex flex-col gap-10 items-center overflow-scroll h-full py-5">
        <p className="text-3xl capitalize text-center font-bold text-white">
          create a new user
        </p>
        <form className="flex flex-col gap-10 w-full items-center">
          <div className="user-info w-6/12 flex flex-col gap-3 ">
            <p className="w-full self-start text-white text-2xl capitalize font-semibold py-2 border-b-2">
              user information
            </p>
            <div className="input-group w-full flex gap-2">
              <input
                type="text"
                placeholder="first name"
                className="py-3 px-4 rounded-lg w-full text-lg"
              />
              <input
                type="text"
                placeholder="last name"
                className="py-3 px-4 rounded-lg w-full text-lg"
              />
            </div>
            <div className="input-group w-full">
              <input
                name="email"
                value={data.email}
                onChange={(e) => HandleChnage(e)}
                type="email"
                placeholder="email"
                className="py-3 px-4 rounded-lg w-full text-lg"
              />
            </div>
            <div className="input-group w-full flex">
              <PhoneInput
                inputStyle={{
                  borderRadius: "10px",
                }}
                countryCodeEditable={false}
                country={"eg"}
                name="phone"
                placeholder="Enter phone number"
                onChange={(e) => {
                  setPhone(e);
                  setData({ ...data, phone: phone });
                }}
              />
            </div>
          </div>
          <div className="project-info w-6/12 flex flex-col gap-3">
            <p
              className="w-full self-start text-white text-2xl capitalize font-semibold 
            py-2 border-b-2"
            >
              project information
            </p>
            <div className="input-group w-full flex gap-2">
              <input
                type="text"
                placeholder="project number"
                className="py-2 px-4 rounded-lg w-full text-lg"
              />
              <input
                type="text"
                placeholder="project name"
                className="py-2 px-4 rounded-lg w-full text-lg"
              />
            </div>
            <div className="input-group w-full">
              <input
                type="text"
                placeholder="project location"
                className="py-2 px-4 rounded-lg w-full text-lg"
              />
            </div>
            <div className="input-group w-full flex gap-2">
              <input
                type="text"
                placeholder="project area"
                className="py-2 px-4 rounded-lg w-full text-lg"
              />
              <input
                type="number"
                placeholder="height "
                className="py-2 px-4 rounded-lg w-full text-lg"
              />
            </div>
            <div className="input-group w-full flex gap-2">
              <input
                type="text"
                placeholder="Consultant "
                className="py-2 px-4 rounded-lg w-full text-lg"
              />
              <input
                type="number"
                placeholder="project duration "
                className="py-2 px-4 rounded-lg w-full text-lg"
              />
            </div>
            <div className="input-group w-full flex gap-2">
              <select
                placeholder="project type"
                className="py-2 px-4 rounded-lg w-full text-lg"
              >
                <option value="">project type</option>
                <option
                  value="Commercial"
                  onClick={() =>
                    setData({ ...data, projectType: "Commercial" })
                  }
                >
                  Commercial
                </option>
                <option
                  value="Residential"
                  onClick={() =>
                    setData({ ...data, projectType: "Residential" })
                  }
                >
                  Residential
                </option>
                <option
                  value="Industrial"
                  onClick={() =>
                    setData({ ...data, projectType: "Industrial" })
                  }
                >
                  Industrial
                </option>
                <option
                  value="Infrastructure"
                  onClick={() =>
                    setData({ ...data, projectType: "Infrastructure" })
                  }
                >
                  Infrastructure
                </option>
              </select>
              <input
                type="text"
                placeholder="last name"
                className="py-2 px-4 rounded-lg w-full text-lg"
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-2xl text-white border-2 py-2 px-10 rounded-lg capitalize 
            hover:bg-white hover:text-color1 duration-200 ease-in-out"
          >
            create
          </button>
        </form>
      </div>
    </div>
  );
};
