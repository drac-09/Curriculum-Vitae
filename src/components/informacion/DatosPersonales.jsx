"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function DatosPersonales({ icono, classTitulo, classBloque }) {
  const [datos, setDatos] = useState([]);
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const tmp = Cookies.get("InformacionPersonal");
    if (tmp) {
      const tmp2 = JSON.parse(tmp);
      const existe = {
        direccion: tmp2.direccion || "",
        correo: tmp2.correo || "",
        celular: tmp2.celular || "",
        dni: tmp2.dni || "",
        estadocivil: tmp2.estadocivil || "",
      };
      if (algunaPropiedadConDatos(existe)) {
        setDatos(existe);
        setMostrar(true);
      }
    }
  }, []);

  function algunaPropiedadConDatos(objeto) {
    for (let propiedad in objeto) {
      if (objeto.hasOwnProperty(propiedad) && objeto[propiedad] !== "") {
        return true; // Retorna true si encuentra al menos una propiedad con datos
      }
    }
    return false; // Retorna false si ninguna propiedad tiene datos
  }

  return (
    <>
      {mostrar ? (
        <div className={`${classBloque}`}>
          <h2 className={`${classTitulo} font-bold mb-1`}>
            INFORMACION PERSONAL
          </h2>

          <div>
            {datos.correo !== "" && datos.correo ? (
              <div className="flex items-center justify-start gap-1 lg:gap-2">
                <h1 className="text-[6px] lg:text-[10px]">{icono.correo} </h1>
                <h1>{datos.correo}</h1>
              </div>
            ) : (
              <></>
            )}

            {datos.direccion !== "" && datos.direccion ? (
              <div className="flex items-center justify-start gap-1 lg:gap-2">
                <h1 className="text-[6px] lg:text-[10px]">
                  {icono.direccion}{" "}
                </h1>
                <h1>{datos.direccion}</h1>
              </div>
            ) : (
              <></>
            )}

            {datos.dni !== "" && datos.dni ? (
              <div className="flex items-center justify-start gap-1 lg:gap-2">
                <h1 className="text-[6px] lg:text-[10px]">{icono.dni} </h1>
                <h1>{datos.dni}</h1>
              </div>
            ) : (
              <></>
            )}

            {datos.celular !== "" && datos.celular ? (
              <div className="flex items-center justify-start gap-1 lg:gap-2">
                <h1 className="text-[6px] lg:text-[10px]">{icono.celular} </h1>
                <h1>{datos.celular}</h1>
              </div>
            ) : (
              <></>
            )}

            {datos.estadocivil !== "" && datos.estadocivil ? (
              <div className="flex items-center justify-start gap-1 lg:gap-2">
                <h1 className="text-[6px] lg:text-[10px]">
                  {icono.estadocivil}{" "}
                </h1>
                <h1>{datos.estadocivil}</h1>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
