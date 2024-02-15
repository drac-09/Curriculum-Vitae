"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import LinkDisenios from "./LinkDisenios";

// Icons
import { FaAnglesDown } from "react-icons/fa6";

export default function SidebarDisenios() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col w-screen md:w-auto">
      <div className="hidden md:flex flex-col h-[85vh] border-r-[1px] border-slate-900 pr-10">
        <div className="flex flex-col items-center gap-3 flex-grow text-sm">
          <LinkDisenios dato="cv1" />
          <LinkDisenios dato="cv2" />
          <LinkDisenios dato="cv3" />
        </div>
      </div>

      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center gap-2 md:hidden bg-slate-900 p-3 mb-3"
      >
        <h1>Diseños</h1>
        <FaAnglesDown className="text-xs" />
      </button>
      {isOpen && (
        <div className="className=block sm:hidden">
          <div className="absolute z-0 w-screen bg-black text-white">
            <div className="flex flex-col h-[84vh]">
              <div className="flex-grow flex gap-5 items-start justify-center">
                <div onClick={toggleDropdown}>
                  <LinkDisenios dato="cv1" />
                </div>
                <div onClick={toggleDropdown}>
                  <LinkDisenios dato="cv2" />
                </div>
                <div onClick={toggleDropdown}>
                  <LinkDisenios dato="cv3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
