"use client";
import DatosPersonales from "@/components/informacion/DatosPersonales";
import HabilidadesBlandas from "@/components/informacion/HabilidadesBlandas";
import HabilidadesTecnicas from "@/components/informacion/HabilidadesTecnicas";
import Lenguajes from "@/components/informacion/Lenguajes";
import RefProfesionales from "@/components/informacion/RefProfesionales";

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

const defaultSrc = "/imagen.jpg";
const item = "•";

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
    <div className="flex flex-col mt-10 md:mt-0">
      <div
        className={`${contenido2.className} antialiased text-xs font-semibold`}
      >
        <div
          id="contenido-pdf"
          className="flex flex-col w-[350px] h-[453px] md:w-[541px] md:h-[700px] bg-white text-black overflow-hidden"
        >
          <section className="flex justify-between w-auto h-auto border-b-[1px] px-7 py-2 bg-[#585858] text-white">
            <div className="w-auto h-auto mt-auto mx-5">
              <Image
                src={fotoPerfil}
                alt="Foto de Perfil"
                width={83}
                height={83}
                className="rounded-[50%]"
              ></Image>
            </div>
            <div className="flex flex-col flex-grow items-center justify-center">
              <h5 className="text-sm">{datos.profesion}</h5>
              <div
                className={`${nombreApellido.className} antialiased text-2xl gap-3 tracking-wider uppercase flex`}
              >
                <h1>{datos.nombre}</h1>
                <h1>{datos.apellido}</h1>
              </div>
            </div>
          </section>
          <section className="flex text-[9px] h-full">
            <section className="w-2/5 bg-[#f2f2f2] py-2 pl-5 pr-3">
              <DatosPersonales icono={cv3} />
              <Lenguajes
                icono={item}
                classBloque="mt-2"
                classTitulo="border-b-[1px] border-black"
              />
              <HabilidadesBlandas
                icono={item}
                classBloque="mt-2"
                classTitulo="border-b-[1px] border-black"
              />
              <HabilidadesTecnicas
                icono={item}
                classBloque="mt-2"
                classTitulo="border-b-[1px] border-black"
              />
              <RefProfesionales
                classBloque="mt-2"
                classTitulo="border-b-[1px] border-black"
              />
            </section>

            <section className="w-3/5 md:h-[580px] py-2 pr-5 pl-3">
              {datos.sobremi !== "" && datos.sobremi ? (
                <div>
                  <h2 className="border-b-[1px] border-black mb-1 font-black">
                    PERFIL
                  </h2>
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
                classTitulo="border-b-[1px] border-black"
              />
              <Educacion
                classBloque="mt-2"
                classTitulo="border-b-[1px] border-black"
              />
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
