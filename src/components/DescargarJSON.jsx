import Cookies from "js-cookie";

export default function DescargarJSON() {
  const fotoPerfil = localStorage.getItem("fotoPerfil");
  const InformacionPersonal = Cookies.get("InformacionPersonal");
  const InformacionAcademica = Cookies.get("InformacionAcademica");
  const ExperienciaLaboral = Cookies.get("ExperienciaLaboral");
  const Competencias = Cookies.get("Competencias");
  const ReferenciasProfesionales = Cookies.get("ReferenciasProfesionales");

  const contenidoJSON = {
    fotoPerfil: fotoPerfil,
    Competencias: Competencias,
    ExperienciaLaboral: ExperienciaLaboral,
    InformacionPersonal: InformacionPersonal,
    InformacionAcademica: InformacionAcademica,
    ReferenciasProfesionales: ReferenciasProfesionales,
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
    enlaceDescarga.download = "datos.json";

    // Simular un clic en el enlace de descarga
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();

    // Limpiar el objeto URL
    URL.revokeObjectURL(url);
    document.body.removeChild(enlaceDescarga);
  };

  return (
    <div>
      <button onClick={descargarArchivoJSON} className="Button">
        Descargar Información
      </button>
    </div>
  );
}
