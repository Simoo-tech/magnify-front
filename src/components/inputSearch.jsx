import { CiSearch } from "react-icons/ci";
import { useLang } from "../context/LangContext";
import { IoCloseOutline } from "react-icons/io5";

export const InputSearch = ({
  autoFocus,
  placeholder,
  search,
  setSearch,
  onChangeHandle,
}) => {
  const { lang } = useLang();
  const langDir = lang === "ar" ? "rtl" : "ltr";

  return (
    <label
      dir={langDir ? langDir : undefined}
      className=" relative focus-within:border-black flex w-full justify-between border border-[#656565]
  px-5 py-2 rounded-3xl items-center bg-white
  md:w-3/6 md:order-3 md:max-w-ful
  lg:w-3/6 lg:order-2"
    >
      <input
        autoFocus={autoFocus}
        type="text"
        name="search-name"
        value={search}
        placeholder={placeholder}
        onChange={onChangeHandle}
        className=" w-full outline-none text-[#6B6B6B] placeholder:text-[#6B6B6B]
        lg:text-base
        md:text-md
        sm:text-sm "
      />
      {search ? (
        <IoCloseOutline
          size={19}
          color="#6B6B6B"
          onClick={() => setSearch("")}
        />
      ) : (
        <CiSearch size={19} color="#6B6B6B" />
      )}
    </label>
  );
};
