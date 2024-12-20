import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Layout2 from "../../layout2";
import icon7 from "/assets/icon7.svg";
import icon8 from "/assets/icon8.svg";
import { SecondaryBtn } from "../../components/Btns";

export default function UploadFiles() {
  const navigate = useNavigate();
  return (
    <Layout2 type="upload-files">
      <section
        id="upload-files"
        className=" h-full max-h-[600px] w-full items-center flex flex-col justify-between py-3 container max-w-full"
      >
        <div
          id="choose-upload-Type"
          className="flex justify-between items-center h-full 
          sm:w-full sm:flex-col
          md:w-9/12 md:flex-row"
        >
          <div
            id="session-data-btn"
            className="SessionData group h-full flex flex-col gap-10 justify-center items-center
            sm:w-full
            md:w-6/12"
          >
            <img
              src={icon8}
              alt="photo-session-data"
              className="sm:w-[70px] md:w-[80px] lg:w-[120px]"
            />
            <SecondaryBtn
              action={() => navigate("session-data")}
              text="photo session data"
              style="sm:!px-10 sm:!py-2 sm:!text-sm md:!text-sm md:!py-2 lg:!px-16 truncate"
            />
          </div>
          <div
            id="missing-photo-btn"
            className="SessionData group h-full flex flex-col gap-10 justify-center items-center
            sm:w-full
            md:w-6/12"
          >
            <img
              src={icon7}
              alt="Missing-Photo"
              className="sm:w-[120px] md:w-[160px] lg:w-[240px]"
            />
            <SecondaryBtn
              action={() => navigate("missing-photo")}
              text="Missing Photo"
              style="sm:!px-10 sm:!py-2 sm:!text-sm md:!text-sm md:!py-2 lg:!px-16 truncate"
            />
          </div>
        </div>
      </section>
      <Outlet />
    </Layout2>
  );
}
