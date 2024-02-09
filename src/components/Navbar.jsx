"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// icons
import { LiaHomeSolid } from "react-icons/lia";
import { LiaUserEditSolid } from "react-icons/lia";
import { LiaEdit } from "react-icons/lia";
import { LiaInfoCircleSolid } from "react-icons/lia";

export default function Navbar() {
  const [menu, setMenu] = useState(false);

  function openMenu() {
    setMenu(!menu);
  }

  return (
    <div className="border-b-[1px] border-slate-900 text-sm">
      <div className="Barra">
        <div>Curriculum Vitae</div>
        <div className="hidden md:flex gap-5">
          <Link href={"/"}>
            <h1>Inicio</h1>
          </Link>
          <Link href={"/perfil/info-personal"}>
            <h1>Perfil</h1>
          </Link>
          <Link href={"/disenos"}>
            <h1>Diseños</h1>
          </Link>
          <Link href={"/informacion"}>
            <h1>Información</h1>
          </Link>
        </div>
        <div className="md:hidden flex-grow flex justify-end">
          <button onClick={openMenu}>
            <Image
              src="/menu.svg"
              alt="menu"
              width={30}
              height={30}
              priority={true}
            />
          </button>
        </div>
        {menu && (
          <div className="block sm:hidden bg-slate-500">
            <div
              onClick={openMenu}
              className="fixed z-10 inset-0 left-0 flex items-start justify-end mt-10 pr-3"
            >
              <div className="flex flex-col gap-3 items-start bg-black text-white border-[1px] rounded-md px-3 py-2">
                <Link href={"/"} className="flex items-center gap-2">
                  <LiaHomeSolid />
                  <h1>Inicio</h1>
                </Link>
                <Link
                  href={"/perfil/info-personal"}
                  className="flex  items-center gap-2"
                >
                  <LiaUserEditSolid />
                  <h1>Perfil</h1>
                </Link>
                <Link href={"/disenos"} className="flex  items-center gap-2">
                  <LiaEdit />
                  <h1>Diseños</h1>
                </Link>
                <Link href={"/info"} className="flex  items-center gap-2">
                  <LiaInfoCircleSolid />
                  <h1>Información</h1>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
