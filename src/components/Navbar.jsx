"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Courgette } from "next/font/google";

const logo = Courgette({
  subsets: ["latin"],
  weight: "400",
});

// icons
import { LiaHomeSolid } from "react-icons/lia";
import { LiaUserEditSolid } from "react-icons/lia";
import { LiaEdit } from "react-icons/lia";
import { LiaInfoCircleSolid } from "react-icons/lia";

export default function Navbar() {
  const pathName = usePathname();
  const perfilPaths = [
    "/perfil/info-personal",
    "/perfil/info-academica",
    "/perfil/competencias",
    "/perfil/experiencia-laboral",
    "/perfil/ref-profesionales",
    "/perfil/cargar-importante",
  ];

  const diseniosPaths = ["/disenios/cv1", "/disenios/cv2", "/disenios/cv3"];

  const [menu, setMenu] = useState(false);

  function openMenu() {
    setMenu(!menu);
  }

  return (
    <div className="border-b-[1px] border-slate-900 text-sm">
      <div className="Barra flex">
        <div>
          <Link
            href={"/"}
            className={`${logo.className} antialiased text-xl font-bold`}
          >
            Curriculum Vitae
          </Link>
        </div>
        <div className="hidden md:flex gap-5 items-center">
          <Link
            href={"/"}
            className={`${pathName === "/" ? "SeleccionadoNavbar" : ""}`}
          >
            <h1>Inicio</h1>
          </Link>
          <Link
            href={"/perfil/info-personal"}
            className={`${
              pathName.startsWith("/perfil/") && perfilPaths.includes(pathName)
                ? "SeleccionadoNavbar"
                : ""
            }`}
          >
            <h1>Perfil</h1>
          </Link>
          <Link
            href={"/disenios/cv1"}
            className={`${
              pathName.startsWith("/disenios/") &&
              diseniosPaths.includes(pathName)
                ? "SeleccionadoNavbar"
                : ""
            }`}
          >
            <h1>Diseños</h1>
          </Link>
          <Link
            href={"/importante"}
            className={`${
              pathName === "/importante" ? "SeleccionadoNavbar" : ""
            }`}
          >
            <h1>Importante</h1>
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
              className="fixed z-20 inset-0 left-0 flex items-start justify-end mt-10 pr-3"
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
                <Link
                  href={"/disenios/cv1"}
                  className="flex  items-center gap-2"
                >
                  <LiaEdit />
                  <h1>Diseños</h1>
                </Link>
                <Link href={"/importante"} className="flex  items-center gap-2">
                  <LiaInfoCircleSolid />
                  <h1>Importante</h1>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
