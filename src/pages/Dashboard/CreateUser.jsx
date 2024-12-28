// components
import {
  AddProject,
  HandleSubmitCreate,
  HandleSubmitEdit,
} from "../../lib/DashboardReq";
import { SecondaryBtn } from "../../components/Btns";
// icons
import { IoIosClose } from "react-icons/io";
// libraryies
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLang } from "../../context/LangContext";
import UserInfo from "./Create-Edit-ClientData/UserInfo";
import ProjectInfo from "./Create-Edit-ClientData/ProjectInfo";
import { NotFound } from "../../pages/NotFound";
import { Loading } from "../../components/Loading";
import { useQuery } from "react-query";
import axios from "axios";
import cookie from "react-cookies";
import MainLayout from "../../Layout/MainLayout";
import * as Yup from "yup";
import { FieldArray, Form, Formik } from "formik";

const user_cookies = cookie.load("user_token");
const serverPath = import.meta.env.VITE_APP_API_BASE;

export function CreateUser({ clientData }) {
  const [projectInfo, setProjectInfo] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (clientData) {
      setProjectInfo(clientData.projectData);
    }
  }, [clientData]);

  // handle message from api
  const [msg, setMsg] = useState({});
  // context
  const { lang } = useLang();

  // fetch data
  const { isLoading, data: checkAdmin } = useQuery("checkIfAdmin", () =>
    axios
      .get(`${serverPath}user/fetchUser/${user_cookies}`)
      .then((res) => res.data.isAdmin)
  );

  if (isLoading) {
    return <Loading />;
  }

  // check user
  if ((id !== user_cookies || !checkAdmin) && !isLoading) {
    return <NotFound />;
  }

  return (
    <MainLayout type="create-user">
      {/* alert message */}

      <FormContainer
        projectInfo={projectInfo}
        setProjectInfo={setProjectInfo}
        setMsg={setMsg}
        clientData={clientData}
        lang={lang}
        msg={msg}
      />
    </MainLayout>
  );
}

const FormContainer = ({
  projectInfo,
  setProjectInfo,
  setMsg,
  clientData,
  lang,
  msg,
}) => {
  // Handle text based on language
  const getText = useMemo(
    () => (enText, arText) => lang === "en" || !lang ? enText : arText,
    [lang]
  );
  const navigate = useNavigate();
  // loading spinner
  const [loading, setLoading] = useState(false);
  const [Addloading, setAddLoading] = useState(false);
  const CreateUserSchema = Yup.object().shape({
    userName: Yup.string()
      .required(getText("user name is required", "اسم المستخدم مطلوب"))
      .min(
        3,
        getText(
          "must be at least 3 characters ",
          "يجب أن يكون على الأقل 3 أحرف"
        )
      )
      .max(
        30,
        getText(
          "user name must be 30 characters only",
          "اسم المستخدم يجب أن يكون 30 حرفًا فقط"
        )
      ),
    lname: Yup.string()
      .required(getText("last name is required", "الاسم الاخير مطلوب"))
      .min(
        3,
        getText(
          "must be at least 3 characters ",
          "يجب أن يكون على الأقل 3 أحرف"
        )
      )
      .max(
        30,
        getText(
          "last name must be 30 characters only",
          "الاسم الاخير يجب أن يكون 30 حرفًا فقط"
        )
      ),
    fname: Yup.string()
      .required(getText("user name is required", "الاسم الاول مطلوب"))
      .min(
        3,
        getText(
          "must be at least 3 characters ",
          "يجب أن يكون على الأقل 3 أحرف"
        )
      )
      .max(
        30,
        getText(
          "first name must be 30 characters only",
          "الاسم الاول يجب أن يكون 30 حرفًا فقط"
        )
      ),
    email: Yup.string()
      .email(getText("Invalid E-mail", "بريد الكتروني غير صالح"))
      .required(getText("E-mail is required", "البريد الإلكتروني مطلوب"))
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        getText("Enter a valid e-mail", "أدخل بريد إلكتروني صالح")
      )
      .trim(),
  });

  return (
    <Formik
      initialValues={{
        userName: clientData?.userName ? clientData?.userName : "",
        fname: clientData?.fname ? clientData?.fname : "",
        lname: clientData?.lname ? clientData?.lname : "",
        email: clientData?.email ? clientData?.email : "",
        phone: clientData?.phone ? clientData?.phone : undefined,
      }}
      onSubmit={
        clientData
          ? (values) => {
              HandleSubmitEdit({
                setLoading,
                values,
                setMsg,
                projectData: projectInfo,
                setProjectInfo,
              });
            }
          : (values) => {
              HandleSubmitCreate({
                setLoading,
                values,
                setMsg,
                projectData: projectInfo,
                navigate,
              });
            }
      }
      validationSchema={CreateUserSchema}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        setFieldValue,
        setTouched,
        validateForm,
      }) => {
        return (
          <Form
            id="content"
            className="flex flex-col w-full overflow-y-scroll justify-between container max-w-full relative "
          >
            {msg.active && (
              <span
                className={`rounded-lg font-normal truncate ${
                  msg.type === "success" ? "bg-lightGreen" : "bg-errorContainer"
                } z-40 absolute top-10 left-[50%] translate-x-[-50%] px-4 flex items-center text-black justify-center gap-2 
          md:text-[16px] md:py-3
          sm:text-xs sm:py-2`}
              >
                <msg.icon
                  color={msg.type === "success" ? "497B62" : "BD5151"}
                  size={25}
                />
                {msg.text}
                <button className="ml-2" onClick={() => setMsg({})}>
                  <IoIosClose size={22} />
                </button>
              </span>
            )}
            <div className="w-full overflow-y-auto  gap-16 flex items-center flex-col pb-3 px-5">
              <h2 className="text-2xl text-center text-primary-color2 capitalize font-semibold">
                {clientData
                  ? lang === "ar"
                    ? "تعديل بيانات مستخدم"
                    : "edit user"
                  : lang === "ar"
                  ? "انشاء مستخدم جديد"
                  : "create new user"}
              </h2>
              {/* user info */}
              <UserInfo
                setFieldValue={setFieldValue}
                setMsg={setMsg}
                userValues={{
                  userID: clientData?.userName,
                  userName: values.userName,
                  lname: values.lname,
                  fname: values.fname,
                  email: values.email,
                  phone: values.phone,
                }}
                touched={touched}
                errors={errors}
                handleChange={handleChange}
              />
              <FieldArray
                name="projectData"
                render={() => (
                  <ProjectInfo
                    setMsg={setMsg}
                    clientData={clientData}
                    setProjectInfo={setProjectInfo}
                    projectInfo={projectInfo}
                    values={values}
                  />
                )}
              />
            </div>
            {/* add project btn */}
            <div
              id="buttons"
              className=" w-full flex justify-center items-center gap-10 border-t-2 pt-3 flex-wrap
              md:flex-row
              sm:flex-col"
            >
              {/* cancel  */}
              <SecondaryBtn
                name="cancel-btn"
                style="sm:order-3 md:order-3 lg:order-1"
                text={lang === "en" || lang === null ? "Back" : "رجوع"}
                type="button"
                action={() => navigate(-1)}
              />
              {/* add project */}
              {clientData && (
                <SecondaryBtn
                  action={async () => {
                    // Validate the form fields
                    const validationErrors = await validateForm();
                    // Check if there are errors
                    if (Object.keys(validationErrors).length > 0) {
                      // Set touched for all fields with errors
                      const touchedFields = Object.keys(
                        validationErrors
                      ).reduce((acc, field) => ({ ...acc, [field]: true }), {});
                      setTouched(touchedFields, true); // Mark fields as touched
                      return; // Exit if there are validation errors
                    }
                    // Proceed with the action if no validation errors
                    AddProject({
                      setAddLoading,
                      values,
                      setProjectInfo,
                      projectInfo,
                      ownerUser: values.userName,
                      setMsg,
                    });
                  }}
                  disabled={Addloading}
                  loading={Addloading}
                  text={lang === "ar" ? "اضف مشروع جديد" : "Add New Project"}
                  type="button"
                  style="sm:order-1 md:order-1 lg:order-2"
                />
              )}
              {/* submit user btn */}
              <SecondaryBtn
                loading={loading}
                name="submit-btn"
                style="sm:order-2 md:order-2 lg:order-3"
                text={
                  clientData
                    ? lang === "en"
                      ? "save edit"
                      : "حفظ التعديلات"
                    : lang === "en"
                    ? "create user"
                    : "انشاء مستخدم"
                }
                type="submit"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
