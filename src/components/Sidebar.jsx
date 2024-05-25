"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import FotoPerfil from "./FotoPerfil";
import DescargarJSON from "./DescargarJSON";
import BorrarInformacion from "./BorrarInformacion";

// Icons
import { FaAnglesDown } from "react-icons/fa6";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [titulo, setTitulo] = useState("Informacion Personal");
  const pathName = usePathname();

  function toggleDropdown(name) {
    setIsOpen(!isOpen);
    setTitulo(name);
  }

  return (
    <div className="flex flex-col w-screen md:w-auto">
      <div className="hidden md:flex flex-col h-[85vh] border-r-[1px] border-slate-500 pr-10">
        <div className="flex flex-col gap-3 flex-grow text-sm">
          <FotoPerfil />
          <Link
            href={"/perfil/info-personal"}
            className={`${
              pathName === "/perfil/info-personal" ? "SeleccionadoSidebar" : ""
            }`}
          >
            <h1>Información Personal</h1>
          </Link>
          <Link
            href={"/perfil/info-academica"}
            className={`${
              pathName === "/perfil/info-academica" ? "SeleccionadoSidebar" : ""
            }`}
          >
            <h1>Información Académica</h1>
          </Link>
          <Link
            href={"/perfil/experiencia-laboral"}
            className={`${
              pathName === "/perfil/experiencia-laboral"
                ? "SeleccionadoSidebar"
                : ""
            }`}
          >
            <h1>Experiencia Laboral</h1>
          </Link>
          <Link
            href={"/perfil/competencias"}
            className={`${
              pathName === "/perfil/competencias" ? "SeleccionadoSidebar" : ""
            }`}
          >
            <h1>Competencias</h1>
          </Link>
          <Link
            href={"/perfil/ref-profesionales"}
            className={`${
              pathName === "/perfil/ref-profesionales"
                ? "SeleccionadoSidebar"
                : ""
            }`}
          >
            <h1>Referencias Profesionales</h1>
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href={"/perfil/cargar-informacion"}
            type="button"
            className="Button flex items-center justify-center"
          >
            <h1>Cargar Informacion</h1>
          </Link>
          <DescargarJSON />
          <BorrarInformacion />
        </div>
      </div>
      <button
        onClick={() => {
          toggleDropdown(titulo);
        }}
        className="flex items-center justify-center gap-2 md:hidden bg-slate-900 p-3 mb-3"
      >
        <h1>{titulo}</h1>
        <FaAnglesDown className="text-xs" />
      </button>
      {isOpen && (
        <div className="block sm:hidden ">
          <div className="absolute z-10 w-screen bg-black text-white">
            <div className="flex flex-col text-sm h-[85vh] ">
              <FotoPerfil />
              <div className="flex-grow flex flex-col gap-4 px-5 items-center ">
                <Link
                  href={"/perfil/info-personal"}
                  className={`${
                    pathName === "/perfil/info-personal"
                      ? "SeleccionadoSidebar"
                      : ""
                  }`}
                  onClick={() => {
                    toggleDropdown("Información Personal");
                  }}
                >
                  <h1>Información Personal</h1>
                </Link>
                <Link
                  href={"/perfil/info-academica"}
                  className={`${
                    pathName === "/perfil/info-academica"
                      ? "SeleccionadoSidebar"
                      : ""
                  }`}
                  onClick={() => {
                    toggleDropdown("Información Académica");
                  }}
                >
                  <h1>Información Académica</h1>
                </Link>
                <Link
                  href={"/perfil/experiencia-laboral"}
                  className={`${
                    pathName === "/perfil/experiencia-laboral"
                      ? "SeleccionadoSidebar"
                      : ""
                  }`}
                  onClick={() => {
                    toggleDropdown("Experiencia Laboral");
                  }}
                >
                  <h1>Experiencia Laboral</h1>
                </Link>
                <Link
                  href={"/perfil/competencias"}
                  className={`${
                    pathName === "/perfil/competencias"
                      ? "SeleccionadoSidebar"
                      : ""
                  }`}
                  onClick={() => {
                    toggleDropdown("Competencias");
                  }}
                >
                  <h1>Competencias</h1>
                </Link>
                <Link
                  href={"/perfil/ref-profesionales"}
                  className={`${
                    pathName === "/perfil/ref-profesionales"
                      ? "SeleccionadoSidebar"
                      : ""
                  }`}
                  onClick={() => {
                    toggleDropdown("Referencias Profesionales");
                  }}
                >
                  <h1>Referencias Profesionales</h1>
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 mb-5">
                <Link
                  href={"/perfil/cargar-informacion"}
                  type="button"
                  className="Button flex items-center justify-center"
                  onClick={() => {
                    toggleDropdown("Cargar Informacion");
                  }}
                >
                  <h1>Cargar Informacion</h1>
                </Link>
                <DescargarJSON />
                <BorrarInformacion />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
