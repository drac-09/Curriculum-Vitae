"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [userMenu, setUserMenu] = useState(false);
  const openModal = () => setUserMenu(true);
  const closeModal = () => setUserMenu(false);

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
        <button className="block md:hidden" onClick={openModal}>
          <Image
            src="/menu.svg"
            alt="menu"
            width={30}
            height={30}
            priority={true}
          />
        </button>
        {userMenu && (
          <div className="block sm:hidden absolute">
            <div
              onClick={closeModal}
              className="fixed inset-0 left-0 flex items-start justify-end pt-10 pr-3"
            >
              <div className="flex flex-col gap-2 items-start bg-black text-white border-[1px] rounded-md w-[100px] pl-2 py-2">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
