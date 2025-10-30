import  { useState } from "react";
import { useTheme } from "../../Hooks/ThemeContext";
import Country from "./Country/Country";
import City from "./City/City";
import State from "./State/State";

type ActiveTab = "country" | "city" | "state";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("country");
  const { theme } = useTheme();

  return (
    <div className="p-6">

      <div className="flex flex-wrap justify-around mb-6 border-b border-gray-200">
        {["country", "city", "state"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as ActiveTab)}
            className={`px-4 py-2 font-medium transition-all duration-300 ${
              activeTab === tab
                ? "border-b-2 border-maincolor text-maincolor text-2xl"
                : `text-lg ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div
        className={`p-4 rounded-lg shadow-sm transition-colors duration-300 ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <div className="relative h-screen overflow-hidden">
          <div
            className={`absolute w-full transition-all duration-500  ${
              activeTab === "country"
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10 pointer-events-none"
            }`}
          >
            <Country />
          </div>

          <div
            className={`absolute w-full transition-all duration-500 ${
              activeTab === "city"
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10 pointer-events-none"
            }`}
          >
            <City />
          </div>

          <div
            className={`absolute w-full transition-all duration-500 ${
              activeTab === "state"
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10 pointer-events-none"
            }`}
          >
            <State />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
