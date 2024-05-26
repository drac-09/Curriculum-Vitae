"use client";
import DatosPersonales from "@/components/informacion/DatosPersonales";
import HabilidadesBlandas from "@/components/informacion/HabilidadesBlandas";
import HabilidadesTecnicas from "@/components/informacion/HabilidadesTecnicas";
import Lenguajes from "@/components/informacion/Lenguajes";
import RefProfesionales from "@/components/informacion/RefProfesionales";

import Experiencia from "@/components/informacion/Experiencia";
import Educacion from "@/components/informacion/Educacion";

import { useState, useEffect } from "react";
import { Roboto, Playfair_Display } from "next/font/google";
import Cookies from "js-cookie";
import Image from "next/image";

// Iconos cv1
import { AiOutlineMail } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { PiIdentificationBadge } from "react-icons/pi";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { GiLinkedRings } from "react-icons/gi";

// Imprimir PDF
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
});

const play = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const cv1 = {
  correo: <AiOutlineMail />,
  direccion: <IoLocationOutline />,
  dni: <PiIdentificationBadge />,
  celular: <IoPhonePortraitOutline />,
  estadocivil: <GiLinkedRings />,
};

const borde = "border-t-[1px] pt-1 mt-1 lg:pt-2 lg:mt-2";
const defaultSrc = "/user2.svg";
const item = "▪";

export default function CurriculumVitaeUno() {
  const [datos, setDatos] = useState([]);
  const [fotoPerfil, setFotoPerfil] = useState(defaultSrc);

  useEffect(() => {
    const image = localStorage.getItem("fotoPerfil");
    if (image) setFotoPerfil(image);
    const existe = Cookies.get("InformacionPersonal");
    if (existe) setDatos(JSON.parse(existe));
  }, []);

  function generarPDF() {
    // Crear un nuevo documento PDF
    const pdf = new jsPDF("p", "pt", "letter");
    // Obtener el contenido del div
    const contenidoDiv = document.getElementById("contenido-pdf");
    contenidoDiv.width = 541; // Ancho del canvas en píxeles
    contenidoDiv.height = 700; // Alto del canvas en píxeles

    // Convertir el contenido a canvas
    html2canvas(contenidoDiv, { scale: 5 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");

      // Agregar la imagen al documento PDF
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight(),
        "",
        "FAST"
      );

      // Guardar el PDF
      pdf.save(`CV-${datos.nombre}${datos.apellido}.pdf`);
    });
  }

  return (
    <div className="flex flex-col ">
      <div
        className={`${roboto.className} antialiased leading-[10px] lg:leading-4 font-semibold`}
      >
        <div
          id="contenido-pdf"
          className="flex flex-col w-[350px] h-[453px] md:w-[541px] md:h-[700px] p-3 lg:p-5 bg-white text-black overflow-hidden"
        >
          <section
            id="barra-superior"
            className="flex justify-between w-auto h-auto border-b-[1px] pb-1 lg:pb-2"
          >
            <div className="flex flex-col justify-between">
              <h5 className="text-[9px] lg:text-sm">{datos.profesion}</h5>
              <div
                className={`${play.className} antialiased text-sm lg:text-2xl font-bold tracking-widest uppercase flex flex-col justify-end`}
              >
                <h1>{datos.nombre}</h1>
                <h1>{datos.apellido}</h1>
              </div>
            </div>
            <div className="w-auto h-auto mt-auto ">
              <Image
                src={fotoPerfil}
                alt="Foto de Perfil"
                width={83}
                height={83}
                className="rounded-[50%] hidden lg:block"
              ></Image>
              <Image
                src={fotoPerfil}
                alt="Foto de Perfil"
                width={53}
                height={53}
                className="rounded-[50%] lg:hidden"
              ></Image>
            </div>
          </section>
          <section
            id="informacion"
            className="flex leading-[10px] lg:leading-4 text-[5.8px] lg:text-[9px]"
          >
            <section
              id="col-izquierda"
              className="w-2/5 py-1 pr-1 lg:py-2 lg:pr-2"
            >
              <DatosPersonales icono={cv1} />
              <HabilidadesBlandas icono={item} classBloque={borde} />
              <HabilidadesTecnicas icono={item} classBloque={borde} />
              <Lenguajes icono={item} classBloque={borde} />
              <RefProfesionales classBloque={borde} />
            </section>
            <section
              id="col-derecha"
              className="w-3/5 h-[372px] lg:h-[580px] border-l-[1px] py-1 pl-1 lg:py-2 lg:pl-2"
            >
              {datos.sobremi !== "" && datos.sobremi ? (
                <div>
                  <h2 className="font-black">PERFIL</h2>
                  <p htmlFor="" className="text-justify">
                    {datos.sobremi}
                  </p>
                </div>
              ) : (
                <></>
              )}
              <Experiencia
                icono="✓&nbsp;"
                classBloque={`${datos.sobremi ? `${borde}` : ""}`}
              />
              <Educacion classBloque={borde} />
            </section>
          </section>
        </div>
        <br />
        <button onClick={generarPDF} className="Button mr-auto">
          Descargar
        </button>
      </div>
    </div>
  );
}
