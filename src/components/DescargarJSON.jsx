import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function DescargarJSON() {
  const [fotoperfil, setFotoperfil] = useState("");
  const [informacionpersonal, setInformacionpersonal] = useState([]);
  const [informacionacademica, setInformacionacademica] = useState([]);
  const [experiencialaboral, setExperiencialaboral] = useState([]);
  const [competencias, setCompetencias] = useState([]);
  const [referenciasprofesionales, setReferenciasprofesionales] = useState([]);
  const [info, setInfo] = useState({
    nombre: "Nombre",
    apellido: "Apellido",
  });

  useEffect(() => {
    const fotoPerfil = localStorage.getItem("fotoPerfil");
    if (fotoPerfil) setFotoperfil(fotoPerfil);

    const InformacionPersonal = Cookies.get("InformacionPersonal");
    if (InformacionPersonal) {
      setInformacionpersonal(InformacionPersonal);
      setInfo(JSON.parse(InformacionPersonal));
    }

    const InformacionAcademica = Cookies.get("InformacionAcademica");
    if (InformacionAcademica) setInformacionacademica(InformacionAcademica);

    const ExperienciaLaboral = Cookies.get("ExperienciaLaboral");
    if (ExperienciaLaboral) setExperiencialaboral(ExperienciaLaboral);

    const Competencias = Cookies.get("Competencias");
    if (Competencias) setCompetencias(Competencias);

    const ReferenciasProfesionales = Cookies.get("ReferenciasProfesionales");
    if (ReferenciasProfesionales)
      setReferenciasprofesionales(ReferenciasProfesionales);
  }, []);

  const contenidoJSON = {
    fotoPerfil: fotoperfil,
    Competencias: competencias,
    ExperienciaLaboral: experiencialaboral,
    InformacionPersonal: informacionpersonal,
    InformacionAcademica: informacionacademica,
    ReferenciasProfesionales: referenciasprofesionales,
  };

  // Convertir el objeto JSON a una cadena JSON
  const contenidoCadenaJSON = JSON.stringify(contenidoJSON, null, 2);

  // Manejar la descarga del archivo JSON
  const descargarArchivoJSON = () => {
    const blob = new Blob([contenidoCadenaJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Crear un enlace de descarga
    const enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = url;
    enlaceDescarga.download = `datos_${info.nombre}${info.apellido}.json`;

    // Simular un clic en el enlace de descarga
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();

    // Limpiar el objeto URL
    URL.revokeObjectURL(url);
    document.body.removeChild(enlaceDescarga);
  };

  return (
    <div>
      <button onClick={descargarArchivoJSON} className="Button w-full">
        Descargar Información
      </button>
    </div>
  );
}
