import  { useEffect } from "react";
import {
  MdNotificationsNone,
  MdOutlineLightMode,
  MdOutlineDarkMode,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useTheme } from "../Hooks/ThemeContext";

const Nav: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang);
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, [i18n]);
  const handleChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
  };

  return (
    <nav
      className={`flex items-center justify-between gap-2 px-3 py-3 md:gap-4 md:px-6 rounded-xl shadow-md transition-colors duration-300 
        ${theme === "dark" ? "bg-black text-white" : "bg-white text-maincolor"}`}
    >
      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <FaUserCircle
          className={`w-6 h-6 md:w-10 md:h-10 ${
            theme === "dark" ? "text-white" : "text-maincolor"
          }`}
        />
        <div className="hidden sm:block">
          <p
            className={`font-semibold ${
              theme === "dark" ? "text-white" : "text-maincolor"
            }`}
          >
            {t("admin")}
          </p>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-maincolor"
            }`}
          >
            {t("dashboard")}
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full max-w-xs md:max-w-md">
        <FiSearch
          className={`absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 ${
            theme === "dark" ? "text-gray-300" : "text-maincolor"
          }`}
        />
        <input
          type="text"
          placeholder={t("search")}
          className={`w-full rounded-full pl-10 pr-3 py-1.5 text-sm focus:ring-2 focus:outline-none transition
            ${
              theme === "dark"
                ? "bg-transparent border border-gray-700 text-white placeholder:text-gray-500 focus:ring-gray-600"
                : "bg-transparent border border-maincolor text-maincolor placeholder:text-gray-400 focus:ring-maincolor"
            }`}
        />
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={toggleTheme}
          className={`flex items-center justify-center w-9 h-9 rounded-full border transition
            ${
              theme === "dark"
                ? "border-gray-700 text-white hover:bg-gray-800"
                : "border-maincolor text-maincolor hover:bg-gray-100"
            }`}
        >
          {theme === "light" ? (
            <MdOutlineDarkMode className="w-5 h-5 text-gray-500" />
          ) : (
            <MdOutlineLightMode className="w-5 h-5 text-amber-300" />
          )}
        </button>

       <select
  value={i18n.language}
  onChange={handleChangeLang}
  className={`px-3 py-1 text-sm rounded-full border transition duration-200 focus:outline-none focus:ring-2
    ${
      theme === "dark"
        ? "bg-gray-800 border-gray-600 text-white hover:border-gray-400 focus:ring-gray-500"
        : "bg-white border-maincolor text-maincolor hover:border-maincolor/70 focus:ring-maincolor"
    }`}
>
  <option
    className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-maincolor"}`}
    value="en"
  >
    {t("lang_en")}
  </option>
  <option
    className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-maincolor"}`}
    value="ar"
  >
    {t("lang_ar")}
  </option>
</select>


        {/* Notifications */}
        <button className="relative">
          <MdNotificationsNone
            className={`w-7 h-7 transition ${
              theme === "dark"
                ? "text-white hover:text-gray-300"
                : "text-maincolor hover:text-maincolor/80"
            }`}
          />
          <span className="absolute top-0 right-0 flex items-center justify-center w-3 h-3 text-xs text-white bg-red-500 rounded-full"></span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
