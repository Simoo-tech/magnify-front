import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { PopUp } from "./components/PopUp";
import icon3 from "/assets/icon3.svg";
import { CopyRight } from "./components/CopyRight";
import { useLang } from "./context/LangContext";

function MainLayout({ children, overFlow, noGap }) {
  const [popUp, setPopUp] = useState(false);
  const [lang] = useLang();
  return (
    <section
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`w-full relative bg-white
      h-dvh flex flex-col items-center justify-start overflow-y-auto ${
        !noGap && "gap-5"
      } `}
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
      <CopyRight />
    </section>
  );
}

export default MainLayout;
