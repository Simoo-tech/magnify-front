import React, { useMemo, useCallback } from "react";
import { Input } from "../../../components/Input";
import { useLang } from "../../../context/LangContext";

export default function UserInfo({ data, setData, setMsg }) {
  const [lang] = useLang();
  const langDir = lang === "ar" ? "rtl" : "ltr";

  // Optimized handle change
  const HandleChangeUser = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
      setMsg({});
    },
    [setData, setMsg]
  );
  const { email, phone, userName, fname, lname } = data;
  const InputFieldsUserInfo = useMemo(
    () => [
      {
        type: "text",
        name: "userName",
        style: "col-span-full",
        text: lang === "ar" ? "اسم المستخدم" : "User Name",
        value: userName || "",
        onChange: HandleChangeUser,
      },
      {
        type: "text",
        name: "fname",
        text: lang === "ar" ? "الاسم الاول" : "First Name",
        value: fname || "",
        onChange: HandleChangeUser,
      },
      {
        type: "text",
        name: "lname",
        text: lang === "ar" ? "الاسم الاخير" : "Last Name",
        value: lname || "",
        onChange: HandleChangeUser,
      },
      {
        type: "email",
        name: "email",
        text: lang === "ar" ? "البريد الالكتروني" : "E-mail",
        value: email || "",
        onChange: (e) => {
          const emailCap = e.target.value.toLowerCase();
          setData((prev) => ({ ...prev, email: emailCap }));
          setMsg({});
        },
      },
      {
        type: "phone",
        text: lang === "ar" ? "رقم الهاتف" : "Phone Number",
        value: `${phone || ""}`,
        onChange: (e) => {
          setData((prev) => ({ ...prev, phone: e }));
          setMsg({});
        },
      },
    ],
    [lang, data, HandleChangeUser, setData, setMsg]
  );

  return (
    <div
      id="user-info"
      className="py-10 w-full flex flex-col gap-10 md:px-10"
      dir={langDir}
    >
      <h2 className="text-primary-color1 capitalize font-semibold sm:text-lg md:text-xl">
        {lang === "ar" ? "معلومات المستخدم" : "User Information"}
      </h2>
      {/* Inputs container */}
      <div id="user-data" className="grid md:grid-cols-2 gap-5">
        {InputFieldsUserInfo.map((input, i) => (
          <Input
            require={true}
            key={i}
            type={input.type}
            name={input.name}
            value={input.value}
            text={input.text}
            onChangeHandle={input.onChange}
            containerStyle={`text-primary-color2 ${input.style}`}
            inputContainerStyle="!px-6"
            labelStlye="sm:text-sm md:!font-[18px]"
          />
        ))}
      </div>
    </div>
  );
}
