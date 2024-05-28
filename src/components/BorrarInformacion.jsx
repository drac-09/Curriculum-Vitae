import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export default function BorrarInformacion() {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const borrar = () => {
    localStorage.removeItem("fotoPerfil");
    Cookies.remove("InformacionPersonal");
    Cookies.remove("InformacionAcademica");
    Cookies.remove("ExperienciaLaboral");
    Cookies.remove("Competencias");
    Cookies.remove("ReferenciasProfesionales");
    router.push("/");
  };

  return (
    <div>
      <button
        type="button"
        className="Button w-full"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Borrar
      </button>
      {modal && (
        <div className="fixed z-40 md:absolute md:z-50 top-0 left-0 h-screen w-screen flex justify-center items-center bg-red-600 bg-opacity-0 text-white">
          <div className="CardModal md:w-max md:h-max py-20 md:p-20 mx-5 bg-black">
            <h1 className="text-red-500 text-center text-xl font-bold">
              Deseas eliminar los datos permanentemente!!!
            </h1>
            <br />
            <div className="flex gap-3 justify-center items-center">
              <button type="button" className="Button" onClick={borrar}>
                Aceptar
              </button>
              <button
                type="button"
                onClick={() => {
                  setModal(!modal);
                }}
                className="Button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
