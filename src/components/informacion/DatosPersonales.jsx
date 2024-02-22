"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function DatosPersonales({ icono, classTitulo, classBloque }) {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const existe = Cookies.get("InformacionPersonal");
    if (existe) setDatos(JSON.parse(existe));
  }, []);

  return (
    <>
      {datos.length !== 0 ? (
        <div className={`${classBloque}`}>
          <h2 className={`${classTitulo} font-bold mb-1`}>
            INFORMACION PERSONAL
          </h2>
          <div>
            <h1>
              {icono} {datos.correo}
            </h1>
            <h1>
              {icono} {datos.direccion}
            </h1>
            <h1>
              {icono} {datos.dni}
            </h1>
            <h1>
              {icono} {datos.celular}
            </h1>
            <h1>
              {icono} {datos.estadocivil}
            </h1>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
