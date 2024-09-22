import { createContext, useContext, useState } from "react";

const LangContext = createContext();

const LangProvider = ({ children }) => {
  const [lang, setLang] = useState("en");
  return (
    <LangContext.Provider value={[lang, setLang]}>
      {children}
    </LangContext.Provider>
  );
};

const useLang = () => useContext(LangContext);

export { LangProvider, useLang };
