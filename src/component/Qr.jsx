import { useState, useRef } from "react";
import cookie from "react-cookies";
import { MdQrCodeScanner } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";
import { QRCode } from "react-qr-code";
import { saveSvgAsPng } from "save-svg-as-png";
import { SecondaryBtn } from "./Btns";

export const QR = () => {
  const lang = window.localStorage.getItem("lang");

  const user = cookie.load("user_token");
  // generate qr
  const Qr = useRef();
  const [showQr, setShowQr] = useState(false);

  const DownloadQR = () => {
    saveSvgAsPng(Qr.current, "QR-Login-Code.jpg", { scale: 8 });
  };

  return (
    <div
      className={`fixed bottom-5 z-30 ${lang === "ar" ? "left-5" : "right-5"}`}
    >
      <div className="bg-primary-color1 rounded-full  relative">
        <MdQrCodeScanner
          color="white"
          className="h-full p-2 sm:w-[45px] md:w-[50px] lg:w-[55px] cursor-pointer"
          onClick={() => setShowQr(!showQr)}
        />
      </div>
      <div
        className={`${showQr ? "flex" : "hidden"} qr-container absolute ${
          lang === "ar" ? "left-[10%]" : "right-[10%]"
        } bottom-[4rem] h-fit bg-white z-50 py-2 px-4 flex- flex-col
      items-center border-[1px] rounded-lg border-black 
      lg:w-[200px] lg:gap-5
      md:w-[180px] md:gap-5
      sm:w-[160px] sm:gap-3`}
      >
        <IoMdArrowDropup
          size={25}
          color="497B62"
          className={`absolute rotate-180 -bottom-[16px] ${
            lang === "ar" ? "left-2" : "right-2"
          }`}
          onClick={(e) => e.stopPropagation()}
        />
        <h6
          className=" text-center text-primary-color1 
        lg:text-xs
        md:text-[12px]
        sm:text-[11px]"
        >
          {lang === "ar"
            ? " قم بتنزيل رمز الاستجابة الخاص بك لتسجيل الدخول بدون بريدك الإلكتروني  "
            : "Download your QR to login without your email"}
        </h6>
        <QRCode
          value={`https://www.magnifyportal.com/${user}`}
          title="QRcode"
          id="QRCode"
          ref={Qr}
          className="sm:w-[70px] md:w-[90px] lg:w-[90px] h-fit"
        />
        <SecondaryBtn
          action={DownloadQR}
          type="button"
          text={lang === "ar" ? "تحميل" : "Download"}
          style="!px-7 !py-1
          lg:!text-xs
          md:!text-[13px]
          sm:!text-[11px]"
        />
      </div>
    </div>
  );
};
