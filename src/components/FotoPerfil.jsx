"use client";
import { useState } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import CropperImg from "@/components/CropperImg";
import { Cropper } from "react-cropper";
import { CiImageOn } from "react-icons/ci";
import Image from "next/image";

export default function FotoPerfil() {
  const [modal, setModal] = useState(false);

  const openmodal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center border-b-[1px] border-slate-900 pb-5 mb-5 h-72 md:h-auto">
        <PiUserCircleThin className="text-[150px]" />
        <button className="Button" onClick={openmodal}>
          Seleccionar Foto...
        </button>
      </div>

      {modal && (
        <div className="fixed z-40 md:absolute md:z-50 top-0 left-0 h-screen w-screen flex justify-center items-center bg-red-600 bg-opacity-0 text-white">
          <div className="flex flex-col gap-5 w-screen h-screen md:w-[700px] md:h-[470px] bg-slate-950 p-5">
            <div className="flex flex-col gap-3 md:flex-row flex-grow w-full h-full">
              <section className="CardModal w-full h-full">
                <CropperImg />
              </section>
            </div>

            <div className="flex gap-3 justify-end">
              <button type="button" className="Button">
                Aceptar
              </button>
              <button type="button" className="Button" onClick={openmodal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
