import { createContext, useContext, useEffect, useState } from "react";

const LangContext = createContext(null);

const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    // Use a function to safely access localStorage
    const savedLang = window.localStorage.getItem("lang");
    return savedLang || "en";
  });

  useEffect(() => {
    // Save the language to localStorage whenever it changes
    window.localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

const useLang = () => useContext(LangContext);

export { LangProvider, useLang };
