import React from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import useDarkMode from "@/hooks/useDarkMode";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";

const SidebarLogo = ({ menuHover }) => {
  const [isDark] = useDarkMode();
  const [collapsed, setMenuCollapsed] = useSidebar();
  // semi dark
  const [isSemiDark] = useSemiDark();
  // skinss
  const [skin] = useSkin();
  return (
    <div
      className={` logo-segment flex justify-between items-center bg-[#1E1E1E]  z-[9] py-6  px-4
      ${menuHover ? "logo-hovered" : ""}
      ${
        skin === "bordered"
          ? " border-b border-r-0 border-slate-700"
          : " border-none"
      }

      `}
    >
      <Link href="/analytics">
        <div className="flex items-center space-x-4">
          <div className="logo-icon">
            {!isDark && !isSemiDark ? (
              <img src="/assets/images/all-img/ck.svg" alt="" />
            ) : (
              <img src="/assets/images/all-img/ck.svg" alt="" />
            )}
          </div>

          {(!collapsed || menuHover) && (
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                My-krew
              </h1>
            </div>
          )}
        </div>
      </Link>

      {(!collapsed || menuHover) && (
        <div
          onClick={() => setMenuCollapsed(!collapsed)}
          className={`h-4 w-4 border-[1.5px] border-slate-900 dark:border-slate-700 rounded-full transition-all duration-150
          ${
            collapsed
              ? ""
              : "ring-2 ring-inset ring-offset-4 ring-black-900 dark:ring-slate-400 bg-[#1E1E1E] dark:ring-offset-slate-700"
          }
          `}
        ></div>
      )}
    </div>
  );
};

export default SidebarLogo;
