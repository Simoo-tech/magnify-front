import { useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { MdQrCodeScanner } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";
import { QRCode } from "react-qr-code";
import { saveSvgAsPng } from "save-svg-as-png";

export const QR = () => {
  const lang = window.localStorage.getItem("lang");

  const [cookies] = useCookies(["user_token"]);
  // generate qr
  let user;
  if (cookies) {
    user = cookies.user_token;
  }
  const Qr = useRef();
  const [showQr, setShowQr] = useState(false);

  const DownloadQR = () => {
    saveSvgAsPng(Qr.current, "QR-Login-Code.jpg", { scale: 8 });
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 `}>
      <div className="bg-white rounded-full text-black relative">
        <MdQrCodeScanner
          size={35}
          className="w-full h-full p-2  cursor-pointer"
          onClick={() => setShowQr(!showQr)}
        />
      </div>
      <div
        className={`${
          showQr ? "flex" : "hidden"
        } qr-container absolute right-[10%] bottom-[4rem] w-[200px] h-fit bg-white z-50 py-2 px-4 flex- flex-col
      gap-5 items-center border-[1px] rounded-lg border-black `}
      >
        <IoMdArrowDropup
          size={25}
          color="white"
          className="absolute rotate-180 -bottom-[16px] right-2 "
          onClick={(e) => e.stopPropagation()}
        />
        <h6 className="text-xs text-center ">
          {lang === "ar"
            ? " قم بتنزيل رمز الاستجابة الخاص بك لتسجيل الدخول بدون بريدك الإلكتروني  "
            : "Download your QR to login without your email"}
        </h6>
        <QRCode
          value={`https://www.magnifyportal.com/${user._id}`}
          size="70"
          title="QRcode"
          id="QRCode"
          ref={Qr}
        />
        <button
          onClick={DownloadQR}
          className="bg-color1 py-2 sm:px-3 lg:px-6 text-sm text-white rounded-xl"
        >
          {lang === "ar" ? "تحميل" : "Download"}
        </button>
      </div>
    </div>
  );
};
