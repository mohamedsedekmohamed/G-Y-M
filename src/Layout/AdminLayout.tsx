import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import Nav from "../Component/Nav";
import { useTheme } from "../Hooks/ThemeContext";


const AdminLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsOpen(true);
    }
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`
        flex h-screen overflow-hidden relative
        transition-colors duration-300
        ${
          theme === "dark"
            ? "bg-[#0b0b0b] text-white"
            : "bg-[#EDF2EC] text-maincolor"
        }
      `}
    >
      <aside
        className={`
          transition-all duration-300 relative
          ${isOpen ? "w-56" : "w-16"}
          ${theme === "dark" ? "bg-black border-gray-800" : "bg-white border-maincolor/20"}
          border-r p-1 z-10 h-screen
        `}
      >
        <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
      </aside>

      <div className="flex flex-col w-full overflow-auto">
        <header
          className={`
            sticky top-0 z-10 shadow-md transition-colors duration-300
            ${theme === "dark" ? "bg-black" : "bg-white"}
          `}
        >
          <Nav />
        </header>

        <main
          className={`
            flex-1 w-full p-4 transition-colors duration-300
            ${theme === "dark" ? "bg-[#0b0b0b] text-white" : "bg-[#EDF2EC] text-maincolor"}
          `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
