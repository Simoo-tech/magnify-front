import React, { useMemo, useCallback } from "react";
import { Input } from "../../../components/Input";
import { useLang } from "../../../context/LangContext";

export default function UserInfo({
  setMsg,
  userValues,
  touched,
  errors,
  handleChange,
  setFieldValue,
}) {
  const { lang } = useLang();
  const langDir = lang === "ar" ? "rtl" : "ltr";

  const { email, phone, userName, fname, lname, userID } = userValues;
  const InputFieldsUserInfo = useMemo(
    () => [
      {
        type: "text",
        name: "userName",
        style: "col-span-full !max-w-full",
        text: lang === "ar" ? "اسم المستخدم" : "User Name",
        value: userName,
        errors: errors.userName,
        touched: touched.userName,
      },
      {
        type: "text",
        name: "fname",
        text: lang === "ar" ? "الاسم الاول" : "First Name",
        value: fname,
        style: "!max-w-full",
        errors: errors.fname,
        touched: touched.fname,
      },
      {
        type: "text",
        name: "lname",
        text: lang === "ar" ? "الاسم الاخير" : "Last Name",
        value: lname,
        style: "!max-w-full",
        errors: errors.lname,
        touched: touched.lname,
      },
      {
        type: "email",
        name: "email",
        text: lang === "ar" ? "البريد الالكتروني" : "E-mail",
        value: email,
        style: "!max-w-full",
        errors: errors.email,
        touched: touched.email,
      },
      {
        type: "phone",
        text: lang === "ar" ? "رقم الهاتف" : "Phone Number",
        value: `${phone}`,
        style: "!max-w-full",
        errors: errors.phone,
      },
    ],
    [lang, handleChange, userValues]
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
            disabled={userID && input.name === "userName"}
            errors={input.errors}
            touched={input.touched}
            setFieldValue={setFieldValue}
            require={true}
            key={i}
            type={input.type}
            name={input.name}
            value={input.value}
            text={input.text}
            onChangeHandle={(e) => {
              handleChange(e);
              setMsg({});
            }}
            containerStyle={`text-primary-color2 ${input.style}`}
            inputContainerStyle="!px-6"
            labelStlye="sm:text-sm md:!font-[18px]"
          />
        ))}
      </div>
    </div>
  );
}
