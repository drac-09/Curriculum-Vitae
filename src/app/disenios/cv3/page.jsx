"use client";
import DatosPersonales from "@/components/informacion/DatosPersonales";
import HabilidadesBlandas from "@/components/informacion/HabilidadesBlandas";
import HabilidadesTecnicas from "@/components/informacion/HabilidadesTecnicas";
import Lenguajes from "@/components/informacion/Lenguajes";
import RefProfesionales from "@/components/informacion/RefProfesionales";
import RefPersonales from "@/components/informacion/RefPersonales";

import Experiencia from "@/components/informacion/Experiencia";
import Educacion from "@/components/informacion/Educacion";

import { useState, useEffect } from "react";
import { Cairo, Jost } from "next/font/google";
import Cookies from "js-cookie";
import Image from "next/image";

// Iconos cv3
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { HiIdentification } from "react-icons/hi2";
import { BsFillPhoneFill } from "react-icons/bs";
import { GiLinkedRings } from "react-icons/gi";

// Imprimir PDF
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const nombreApellido = Jost({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const contenido2 = Cairo({
  subsets: ["latin"],
  weight: "300",
});

const cv3 = {
  correo: <MdEmail />,
  direccion: <FaLocationDot />,
  dni: <HiIdentification />,
  celular: <BsFillPhoneFill />,
  estadocivil: <GiLinkedRings />,
};

const defaultSrc = "/user.svg";
const item = "•";
const borde = "border-b-[0.1px] lg:border-b-[1px] border-gray-300";

export default function CurriculumVitaeTres() {
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
    <div className="flex flex-col">
      <div
        className={`${contenido2.className} antialiased leading-[10px] lg:leading-4 font-semibold`}
      >
        <div
          id="contenido-pdf"
          className="flex flex-col w-[350px] h-[453px] md:w-[541px] md:h-[700px] bg-white text-black overflow-hidden"
        >
          <section
            id="barra-superior"
            className="flex h-auto border-b-[1px] bg-[#585858] text-white"
          >
            <div className="w-3/6 flex justify-center px-7 py-[5px] lg:py-2">
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
            <div className="w-3/4 flex flex-col flex-grow items-center justify-center px-7 py-[5px] lg:py-2">
              <h5 className="text-[9px] lg:text-sm">{datos.profesion}</h5>
              <div
                className={`${nombreApellido.className} antialiased text-base lg:text-2xl gap-3 tracking-wider uppercase flex`}
              >
                <h1>{datos.nombre}</h1>
                <h1>{datos.apellido}</h1>
              </div>
            </div>
          </section>
          <section
            id="informacion"
            className="flex leading-[10px] lg:leading-4 text-[5.8px] lg:text-[9px] h-full"
          >
            <section
              id="izquierda"
              className="w-2/5 bg-[#f2f2f2] py-1 pl-3 pr-2 lg:py-2 lg:pl-5 lg:pr-3"
            >
              <DatosPersonales icono={cv3} classTitulo={borde} />
              <Lenguajes icono={item} classBloque="mt-2" classTitulo={borde} />
              <HabilidadesBlandas
                icono={item}
                classBloque="mt-2"
                classTitulo={borde}
              />
              <HabilidadesTecnicas
                icono={item}
                classBloque="mt-2"
                classTitulo={borde}
              />
              <RefProfesionales classBloque="mt-2" classTitulo={borde} />
              <RefPersonales classBloque="mt-2" classTitulo={borde} />
            </section>

            <section
              id="derecha"
              className="w-3/5 md:h-[580px] py-1 pr-3 pl-2 lg:py-2 lg:pr-5 lg:pl-3"
            >
              {datos.sobremi !== "" && datos.sobremi ? (
                <div>
                  <h2 className={`${borde} mb-1 font-black`}>PERFIL</h2>
                  <p htmlFor="" className="text-justify">
                    {datos.sobremi}
                  </p>
                </div>
              ) : (
                <></>
              )}
              <Experiencia
                icono="✓&nbsp;"
                classBloque="mt-2"
                classTitulo={borde}
              />
              <Educacion classBloque="mt-2" classTitulo={borde} />
            </section>
          </section>
          {/* <DatosPersonales /> */}
        </div>
        <br />
        <button onClick={generarPDF} className="Button mr-auto">
          Descargar
        </button>
      </div>
    </div>
  );
}
