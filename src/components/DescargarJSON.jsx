import Cookies from "js-cookie";

export default function DescargarJSON() {
  async function descargarArchivoJSON() {
    try {
      // Realizar verificaciones y asignaciones de datos desde las cookies
      const fotoPerfil = localStorage.getItem("fotoPerfil");
      const InformacionPersonal = Cookies.get("InformacionPersonal");
      const InformacionAcademica = Cookies.get("InformacionAcademica");
      const ExperienciaLaboral = Cookies.get("ExperienciaLaboral");
      const Competencias = Cookies.get("Competencias");
      const ReferenciasProfesionales = Cookies.get("ReferenciasProfesionales");

      const ip = JSON.parse(InformacionPersonal);
      const info = {
        nombre: ip.nombre || "Nombre",
        apellido: ip.apellido || "Apellido",
      };

      // Asignar los datos a los estados correspondientes
      const contenidoJSON = {
        fotoPerfil: fotoPerfil || "",
        Competencias: Competencias || [],
        ExperienciaLaboral: ExperienciaLaboral || [],
        InformacionPersonal: InformacionPersonal || {},
        InformacionAcademica: InformacionAcademica || [],
        ReferenciasProfesionales: ReferenciasProfesionales || [],
      };

      // Convertir el objeto JSON a una cadena JSON
      const contenidoCadenaJSON = JSON.stringify(contenidoJSON, null, 2);
      const blob = new Blob([contenidoCadenaJSON], {
        type: "application/json",
      });
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
    } catch (error) {
      console.error("Error al descargar el archivo JSON:", error);
    }
  }

  return (
    <div>
      <button onClick={descargarArchivoJSON} className="Button w-full">
        Descargar Información
      </button>
    </div>
  );
}
