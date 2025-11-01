import { useTheme } from "../../Hooks/ThemeContext";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Settings: React.FC = () => {
  const { theme } = useTheme();
    const { t } = useTranslation();

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-around mb-6 border-b border-gray-200">
        {[
          { name: "country", label: t("Country") },
          { name: "city", label: t("City") },
          { name: "state", label: t("State") },
        ].map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.name}
            className={({ isActive }) =>
              `px-4 py-2 font-medium transition-all duration-300 ${
                isActive
                  ? "border-b-2 border-maincolor text-maincolor text-2xl"
                  : `text-lg ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      {/* ✅ Content Area */}
      <div
        className={`p-4 rounded-lg shadow-sm transition-colors duration-300 max-w-screen ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
