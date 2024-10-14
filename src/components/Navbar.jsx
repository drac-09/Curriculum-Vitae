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
    "/perfil/ref-personales",
    "/perfil/cargar-importante",
  ];

  const diseniosPaths = ["/disenios/cv1", "/disenios/cv2", "/disenios/cv3"];

  const [menu, setMenu] = useState(false);

  function openMenu() {
    setMenu(!menu);
  }

  return (
    <div className="border-r-[1px] border-slate-900 text-sm h-[100px] md:h-[50px] flex items-center flex-col md:flex-row">
      <div className="Barra flex flex-col md:flex-row">
        <div className="flex justify-center md:justify-start w-full">
          <Link
            href={"/"}
            className={`${logo.className} antialiased text-xl font-bold`}
          >
            Curriculum Vitae
          </Link>
        </div>
        <br className="block md:hidden" />
        <div className="flex gap-5 items-center justify-between w-screen px-5 md:justify-normal md:w-auto md:px-0">
          <Link
            href={"/"}
            className={`${pathName === "/" ? "SeleccionadoNavbar" : ""}`}
          >
            <h1>Inicio</h1>
          </Link>
          |
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
          |
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
          |
          <Link
            href={"/importante"}
            className={`${
              pathName === "/importante" ? "SeleccionadoNavbar" : ""
            }`}
          >
            <h1>Importante</h1>
          </Link>
        </div>
        {/* Menu Despegable para version Mobile */}
        {/* <div className="md:hidden flex-grow flex justify-end">
          <button onClick={openMenu}>
            <Image
              src="/menu.svg"
              alt="menu"
              width={30}
              height={30}
              priority={true}
            />
          </button>
        </div> */}
        {/* Mobil */}
        {/* {menu && (
          <div className="block sm:hidden">
            <div
              onClick={openMenu}
              className="fixed z-20 inset-0 left-0 flex items-start justify-end pt-12"
            >
              <div className="flex flex-col gap-5 items-start bg-black text-base text-white py-2 pl-5 w-screen h-[calc(100vh-50px)]">
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
        )} */}
      </div>
    </div>
  );
}
