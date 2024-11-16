import React from "react";
import { Input } from "../Input";
import { useLang } from "../../context/LangContext";

export default function UserInfo({ data, setData, setMsg }) {
  const [lang] = useLang();
  const langDir = lang === "ar" && "rtl";
  // handle change user data
  const HandleChangeUser = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setMsg({});
  };
  // user info inputs
  const InputFieldsUserInfo = [
    {
      type: "text",
      name: "userName",
      style: "col-span-full",
      text: lang === "ar" ? "اسم المستخدم" : "User Name",
      value: data.userName,
      onChange: HandleChangeUser,
    },
    {
      type: "text",
      name: "fname",
      text: lang === "ar" ? "الاسم الاول" : "First Name",
      value: data.fname,
      onChange: HandleChangeUser,
    },
    {
      type: "text",
      name: "lname",
      text: lang === "ar" ? "الاسم الاخير" : "Last Name",
      value: data.lname,
      onChange: HandleChangeUser,
    },
    {
      type: "text",
      name: "email",
      text: lang === "ar" ? "البريد الالكتروني " : "E-mail",
      value: data.email,
      onChange: (e) => {
        const email = e.target.value.toLocaleLowerCase();
        setData({ ...data, email });
        setMsg({});
      },
    },
    {
      type: "phone",
      text: lang === "ar" ? "رقم الهالتف" : "Phone Number",
      value: `${data.phone}`,
      onChange: (e) => {
        setData({ ...data, phone: e });
        setMsg({});
      },
    },
  ];

  return (
    <div
      id="user-info"
      className="pb-10 w-full flex flex-col gap-10 
        md:px-10"
    >
      <h2
        dir={langDir}
        className="text-primary-color1 capitalize font-semibold 
          md:text-xl
          sm:text-lg"
      >
        {lang === "ar" ? "معلومات المستخدم" : "user information"}
      </h2>
      {/* inputs container */}
      <div id="user-data" className="grid md:grid-cols-2 gap-5 ">
        {InputFieldsUserInfo.map((input, i) => {
          return (
            <Input
              type={input.type}
              key={i}
              name={input.name}
              value={input.value}
              text={input.text}
              onChangeHandle={input.onChange}
              containerStyle={`text-primary-color2 ${input.style}`}
              inputContainerStyle="!px-6"
              labelStlye="sm:text-sm md:!font-[18px]"
            />
          );
        })}
      </div>
    </div>
  );
}
