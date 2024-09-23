import React, { useState } from "react";
import { Navbar } from "./component/Navbar";
import { PopUp } from "./component/PopUp";
import icon3 from "/assest/icon3.svg";
import { Footer } from "./component/Footer";
import { useLang } from "./context/LangContext";

function Layout({ children, overFlow }) {
  const [popUp, setPopUp] = useState(false);
  const [lang] = useLang();
  return (
    <div
      dir={lang === "ar" && "rtl"}
      className="w-full h-full flex flex-col sm:overflow-y-scroll xl:overflow-hidden"
      style={{ overflowY: overFlow }}
    >
      <Navbar setPopUp={setPopUp} />
      {popUp && (
        <PopUp
          setPopUp={setPopUp}
          iconImage={icon3}
          text={
            lang === "ar"
              ? " هل أنت متأكد أنك تريد تسجيل الخروج من magnify portal  "
              : "Are you sure you want to log out from magnify portal?"
          }
          type="yes-no"
          noAction={() => setPopUp(!popUp)}
          yesAction={() => {
            window.location.replace("/logout");
          }}
        />
      )}
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
