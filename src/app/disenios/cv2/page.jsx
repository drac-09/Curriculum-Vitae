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
import { Saira_Condensed, Arsenal } from "next/font/google";
import Cookies from "js-cookie";
import Image from "next/image";

// Iconos cv2
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { HiIdentification } from "react-icons/hi2";
import { BsFillPhoneFill } from "react-icons/bs";
import { GiLinkedRings } from "react-icons/gi";

// Imprimir PDF
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const nombreApellido = Saira_Condensed({
  subsets: ["latin"],
  weight: "300",
});

const contenido = Arsenal({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cv2 = {
  correo: <MdEmail />,
  direccion: <FaLocationDot />,
  dni: <HiIdentification />,
  celular: <BsFillPhoneFill />,
  estadocivil: <GiLinkedRings />,
};

const defaultSrc = "/user.svg";

export default function CurriculumVitaeDos() {
  const [datos, setDatos] = useState([]);
  const [fotoPerfil, setFotoPerfil] = useState(defaultSrc);
  const [fotoRedonda, setFotoRedonda] = useState(false);

  useEffect(() => {
    const image = localStorage.getItem("fotoPerfil");
    if (image) setFotoPerfil(image);
    const existe = Cookies.get("InformacionPersonal");
    if (existe) setDatos(JSON.parse(existe));
    const estadoFoto = localStorage.getItem("fotoRedonda") === "true";
    setFotoRedonda(estadoFoto);
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
        className={`${contenido.className} antialiased leading-[10px] lg:leading-4`}
      >
        <div
          id="contenido-pdf"
          className="flex flex-col w-[350px] h-[453px] md:w-[541px] md:h-[700px] bg-white text-black overflow-hidden"
        >
          <section className="flex text-[6.3px] lg:text-[10px]">
            <section
              id="izquierda"
              className="w-2/5 h-[700px] bg-[#424e5e] text-white p-3 lg:p-5"
            >
              <section className="flex flex-col justify-between w-auto h-auto pb-2 mb-2">
                <div className="mx-auto w-auto h-auto mt-auto mb-2">
                  <Image
                    src={fotoPerfil}
                    alt="Foto de Perfil"
                    width={100}
                    height={100}
                    className={
                      fotoRedonda
                        ? "rounded-[50%] hidden lg:block"
                        : "hidden lg:block"
                    }
                  ></Image>
                  <Image
                    src={fotoPerfil}
                    alt="Foto de Perfil"
                    width={65}
                    height={65}
                    className="rounded-[50%] lg:hidden"
                  ></Image>
                </div>
                <div className="flex flex-col justify-between">
                  <div
                    className={`${nombreApellido.className} h-auto w-[115px] md:w-[180px] antialiased tracking-widest leading-[15px] lg:leading-6 uppercase flex flex-col justify-end overflow-hidden`}
                  >
                    <h1 className="text-[clamp(0.6rem,5vw,0.9rem)] md:text-[clamp(1.2rem,5vw,1.3rem)] font-normal">
                      {datos.nombre} {datos.apellido}
                    </h1>
                  </div>
                  <h5 className="text-[9px] lg:text-[14px] mt-1">
                    {datos.profesion}
                  </h5>
                </div>
              </section>
              {datos.sobremi !== "" && datos.sobremi ? (
                <div className="mb-2">
                  <h2 className="font-bold border-b-[1px] mb-1">PERFIL</h2>
                  <p htmlFor="" className="hyphens-manual">
                    {datos.sobremi}
                  </p>
                </div>
              ) : (
                <></>
              )}
              <DatosPersonales
                icono={cv2}
                classBloque="mb-2"
                classTitulo="border-b-[1px] mb-1"
              />
              <HabilidadesTecnicas
                icono="▸&nbsp;"
                classBloque="mb-2"
                classTitulo="border-b-[1px] mb-1"
              />
              <HabilidadesBlandas
                icono="▸&nbsp;"
                classBloque="mb-2"
                classTitulo="border-b-[1px] mb-1"
              />
            </section>
            <section
              id="derecha"
              className="w-3/5 md:h-[580px] border-l-[1px] p-3 pl-1 lg:p-5 lg:pl-3"
            >
              <Experiencia
                icono="✓&nbsp;"
                classBloque="mb-2"
                classTitulo="bg-[#fdedcb] pl-1"
                classBody="pl-3"
              />
              <Educacion
                classBloque="mb-2"
                classTitulo="bg-[#fdedcb] pl-1"
                classBody="pl-3"
              />
              <RefProfesionales
                classBloque="mb-2"
                classTitulo="bg-[#fdedcb] pl-1"
                classBody="pl-3"
              />
              <RefPersonales
                classBloque="mb-2"
                classTitulo="bg-[#fdedcb] pl-1"
                classBody="pl-3"
              />
              <Lenguajes
                icono="▸&nbsp;"
                classBloque="mb-2"
                classTitulo="bg-[#fdedcb] pl-1"
                classBody="pl-3"
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
