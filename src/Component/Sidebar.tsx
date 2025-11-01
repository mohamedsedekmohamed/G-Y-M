import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";

import { NavLink, useLocation } from "react-router-dom";
import { CgGym } from "react-icons/cg";
import CiUser from "../Icons/IconUsers";
import IconDashboard from "../Icons/IconDashboard";
import IconAccountings from "../Icons/IconAccountings";
import IconStore from "../Icons/IconStore";
import IconClasses from "../Icons/IconClasses";
import IconPackages from "../Icons/IconPackages";
import IconRent from "../Icons/IconRent";
import IconSettings from "../Icons/IconSettings";
import IconPrivate from "../Icons/IconPrivate";
import IconReports from "../Icons/IconReports";
import IconAttendance from "../Icons/IconAttendance";
import IconMajor from "../Icons/IconMajor";
import IconSubscriptions from "../Icons/IconSubscriptions";
import IconPayment from "../Icons/IconPayment";
import IconRoom from "../Icons/IconRoom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../Hooks/ThemeContext";


interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SidebarLink {
  to: string;
  name: string;
  icon: ReactElement<any, any>;
  iconActive: ReactElement<any, any>;
}

const Sidebar: React.FC<SidebarProps> = ({ setIsOpen, isOpen }) => {
  const [isActive, setIsActive] = useState<string>("/admin/users");
  const location = useLocation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const links: SidebarLink[] = [
    { to: "dashboard", name: t("sidebar.dashboard"), icon: <IconDashboard />, iconActive: <IconDashboard active /> },
    { to: "attendance", name: t("sidebar.attendance"), icon: <IconAttendance />, iconActive: <IconAttendance active /> },
    { to: "users", name: t("sidebar.users"), icon: <CiUser />, iconActive: <CiUser active /> },
    { to: "store", name: t("sidebar.store"), icon: <IconStore />, iconActive: <IconStore active /> },
    { to: "classes", name: t("sidebar.classes"), icon: <IconClasses />, iconActive: <IconClasses active /> },
    { to: "packages", name: t("sidebar.packages"), icon: <IconPackages />, iconActive: <IconPackages active /> },
    { to: "rent", name: t("sidebar.rent"), icon: <IconRent />, iconActive: <IconRent active /> },
    { to: "room", name: t("sidebar.room"), icon: <IconRoom />, iconActive: <IconRoom active /> },
    { to: "payment", name: t("sidebar.payment"), icon: <IconPayment />, iconActive: <IconPayment active /> },
    { to: "private", name: t("sidebar.private"), icon: <IconPrivate />, iconActive: <IconPrivate active /> },
    { to: "subscriptions", name: t("sidebar.sub"), icon: <IconSubscriptions />, iconActive: <IconSubscriptions active /> },
    { to: "settings/country", name: t("sidebar.settings"), icon: <IconSettings />, iconActive: <IconSettings active /> },
    { to: "accountings", name: t("sidebar.accountings"), icon: <IconAccountings />, iconActive: <IconAccountings active /> },
    { to: "reports", name: t("sidebar.reports"), icon: <IconReports />, iconActive: <IconReports active /> },
    { to: "majors", name: t("sidebar.major"), icon: <IconMajor />, iconActive: <IconMajor active /> },
  ];

  useEffect(() => {
    const customPaths: Record<string, string> = {
      "/admin/addusers": "/admin/users",
      "/admin/addaccountings": "/admin/accountings",
      "/admin/addclasses": "/admin/classes",
      "/admin/addpackages": "/admin/packages",
      "/admin/addrent": "/admin/rent",
      "/admin/addpayment": "/admin/payment",
      "/admin/addstore": "/admin/store",
      "/admin/addattendance": "/admin/attendance",
      "/admin/addprivate": "/admin/private",
      "/admin/addsubscriptions": "/admin/subscriptions",
      "/admin/addmajors": "/admin/majors",
      "/admin/addroom": "/admin/room",
      "/admin/settings/addcountry": "/admin/settings/country",
      "/admin/settings/addcity": "/admin/settings/country",
      "/admin/settings/addstate": "/admin/settings/country",
      "/admin/settings/city": "/admin/settings/country",
      "/admin/settings/state": "/admin/settings/country",
    };
    const newPath = customPaths[location.pathname] || location.pathname;
    setIsActive(newPath.toLowerCase());
  }, [location.pathname]);

  useEffect(() => {
    if (window.innerWidth >= 1024) setIsOpen(true);

    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className={`block md:hidden h-screen rounded-r-3xl top-0 z-50 transition-all duration-300 ${theme === "dark" ? "bg-[#0b0b0b]" : "bg-white"
          } ${isOpen ? "absolute w-full" : ""}`}
      >
        <div
          className={`flex items-center ${isOpen ? "justify-start gap-4 px-4" : "justify-center"
            } py-4 cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-center z-100">
            <CgGym className={`h-8 w-8 ${theme === "dark" ? "text-maincolor" : "text-maincolor"}`} />
          </div>
          {isOpen && (
            <h1 className={`font-bold text-[14px] lg:text-[20px] ${theme === "dark" ? "text-maincolor" : "text-maincolor"}`}>
              Gymnista
            </h1>
          )}
        </div>

        <nav
          className="space-y-3 pt-6 text-center px-2 h-[calc(100vh-100px)] overflow-y-auto"
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          {links.map((link) => {
            const isCurrent = isActive === `/admin/${link.to}`;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`flex items-center transition-all duration-200 rounded-3xl h-[48px] ${isOpen ? "w-full pl-4 gap-3" : "justify-center w-full"
                  } relative`}
              >
                <div
                  className={`absolute h-12 z-10 rounded-r-[12px] w-1 left-0 top-0 ${isCurrent ? "bg-maincolor" : ""
                    }`}
                />
                <div className="w-6 h-6">
                  {React.cloneElement(isCurrent ? link.iconActive : link.icon, {
                    className: `w-[22px] h-[22px] ${isCurrent
                        ? "text-maincolor"
                        : theme === "dark"
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`,
                  })}
                </div>
                {isOpen && (
                  <span
                    className={`font-bold text-[12px] ${isCurrent
                        ? "text-maincolor"
                        : theme === "dark"
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                  >
                    {link.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div
        className={`hidden md:block h-screen sticky rounded-tr-3xl top-0 z-50 transition-all duration-300 ${theme === "dark" ? "bg-[#0b0b0b]" : "bg-white"
          }`}
      >
        <div
          className={`flex items-center ${isOpen ? "justify-start gap-4 px-4" : "justify-center"
            } py-4 cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-center z-100">
            <CgGym className={`h-8 w-8 ${theme === "dark" ? "text-maincolor" : "text-maincolor"}`} />
          </div>
          {isOpen && (
            <h1 className={`font-bold text-[14px] lg:text-[24px] ${theme === "dark" ? "text-maincolor" : "text-maincolor"}`}>
              Gymnista
            </h1>
          )}
        </div>

        <nav
          className="space-y-3 pt-6 text-center px-2 h-[calc(100vh-100px)] overflow-y-auto"
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          {links.map((link) => {
            const isCurrent = isActive === `/admin/${link.to}`;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`flex items-center transition-all gap-5 duration-200 rounded-2xl h-[48px] ${isOpen ? "w-full pl-2 gap-1" : "justify-center w-full"
                  } relative`}
              >
                <div
                  className={`absolute h-12 z-10 rounded-r-[12px] w-2 right-43 top-0 ${isCurrent ? "bg-maincolor" : ""
                    }`}
                />
                <div className="w-6 h-6">
                  {React.cloneElement(isCurrent ? link.iconActive : link.icon, {
                    className: `w-[22px] h-[22px] pt-1 ${isCurrent
                        ? "text-maincolor"
                        : theme === "dark"
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`,
                  })}
                </div>
                {isOpen && (
                  <span
                    className={`font-normal text-[14px] mt-2 lg:text-[18px] ${isCurrent
                        ? "lg:text-[20px] text-maincolor"
                        : theme === "dark"
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                  >
                    {link.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
