"use client";
import { useState, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Cargar() {
  const router = useRouter();
  const [archivo, serArchivo] = useState(null);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("Selecciona un archivo");

  const [visible, setVisible] = useState(false);
  const [animacion, setAnimacion] = useState();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Función para manejar la carga del archivo JSON
  const cargarArchivo = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      serArchivo(selectedFile);
    } else {
      setFileName("Selecciona un archivo");
    }
  };

  // Función para cargar la información del archivo en una constante
  const cargarInformacionDesdeJSON = () => {
    if (archivo) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const contenidoJSON = JSON.parse(event.target.result);
        localStorage.setItem("fotoPerfil", contenidoJSON.fotoPerfil);
        Cookies.set("Competencias", contenidoJSON.Competencias, {
          expires: 3650,
        });
        Cookies.set("ExperienciaLaboral", contenidoJSON.ExperienciaLaboral, {
          expires: 3650,
        });
        Cookies.set("InformacionPersonal", contenidoJSON.InformacionPersonal, {
          expires: 3650,
        });
        Cookies.set(
          "InformacionAcademica",
          contenidoJSON.InformacionAcademica,
          { expires: 3650 }
        );
        Cookies.set(
          "ReferenciasProfesionales",
          contenidoJSON.ReferenciasProfesionales,
          { expires: 3650 }
        );
        // setVisible(true);
        // setAnimacion("animate-fade-right");
        // setTimeout(() => {
        //   setAnimacion(
        //     "animate-fade-right animate-reverse animate-delay-[2000ms]"
        //   );
        // }, 2000);
        // setTimeout(() => {
        //   setVisible(false);
        // }, 3000);
      };
      reader.readAsText(archivo);
      router.push("/disenios/cv1");
    } else {
      alert("Por favor selecciona un archivo JSON.");
    }
  };

  return (
    <div>
      <h5 className="Titulo">Cargar Información.</h5>
      <hr className="opacity-20 my-1" />
      <p>
        Si ya antes habías ingresado tu informacion y la descargaste en un
        archivo, puedes cargarla nuevamente, solo pulsa el botón{" "}
        <span className="MsjExito">Seleccionar archivo</span>, seleccionas el
        archivo y luego pulsas el botón{" "}
        <span className="MsjExito">Cargar Información</span>.
      </p>
      <h1 className="Alerta mt-2 font-bold">
        Importante: Al cargar tus datos estos reemplazaran los que ya están
        ingresados.
      </h1>
      <br />
      <div className="flex flex-col gap-5">
        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          onChange={cargarArchivo}
          className="border-none max-w-max rounded-sm bg-slate-900 pr-2 hidden"
        />

        {/* Botón personalizado */}
        <div className="flex items-center max-w-max">
          <button
            onClick={handleClick}
            type="button"
            className="border-[1px] rounded-none py-1 px-2 bg-slate-900"
          >
            Seleccionar Archivo
          </button>
          <p className="border-[1px] border-l-0 px-3 py-1">{fileName}</p>
        </div>

        <button
          onClick={cargarInformacionDesdeJSON}
          type="button"
          className="Button mr-auto"
        >
          Cargar Información
        </button>
        {visible && (
          <h1 id="mensaje" className={`MsjExito ${animacion}`}>
            Datos agregados con éxito!!!
          </h1>
        )}
      </div>
    </div>
  );
}
