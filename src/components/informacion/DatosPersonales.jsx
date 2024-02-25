"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function DatosPersonales({ icono, classTitulo, classBloque }) {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const existe = Cookies.get("InformacionPersonal");
    if (existe) setDatos(JSON.parse(existe));
  }, []);

  const verificar = `${
    datos.correo !== "" ||
    datos.direccion !== "" ||
    datos.dni !== "" ||
    datos.celular !== "" ||
    datos.estadocivil !== ""
  }`;

  return (
    <>
      {verificar && datos.length !== 0 ? (
        <div className={`${classBloque}`}>
          <h2 className={`${classTitulo} font-bold mb-1`}>
            INFORMACION PERSONAL
          </h2>
          <div>
            {datos.correo !== "" && datos.correo ? (
              <div className="flex items-center justify-start gap-2">
                <h1 className="text-[10px]">{icono.correo} </h1>
                <h1>{datos.correo}</h1>
              </div>
            ) : (
              <></>
            )}

            {datos.direccion !== "" && datos.direccion ? (
              <div className="flex items-center justify-start gap-2">
                <h1 className="text-[10px]">{icono.direccion} </h1>
                <h1>{datos.direccion}</h1>
              </div>
            ) : (
              <></>
            )}

            {datos.dni !== "" && datos.dni ? (
              <div className="flex items-center justify-start gap-2">
                <h1 className="text-[10px]">{icono.dni} </h1>
                <h1>{datos.dni}</h1>
              </div>
            ) : (
              <></>
            )}

            {datos.celular !== "" && datos.celular ? (
              <div className="flex items-center justify-start gap-2">
                <h1 className="text-[10px]">{icono.celular} </h1>
                <h1>{datos.celular}</h1>
              </div>
            ) : (
              <></>
            )}

            {datos.estadocivil !== "" && datos.estadocivil ? (
              <div className="flex items-center justify-start gap-2">
                <h1 className="text-[10px]">{icono.estadocivil} </h1>
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
