"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function DatosPersonales({ cv }) {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const existe = Cookies.get("InformacionPersonal");
    if (existe) setDatos(JSON.parse(existe));
  }, []);

  return (
    <>
      {datos.length !== 0 ? (
        <div>
          <h2 className="font-black mb-1">INFORMACION PERSONAL</h2>
          <div>
            <h1 className="flex items-center justify-start gap-1">
              {cv.correo} {datos.correo}
            </h1>
            <h1 className="flex items-center justify-start gap-1">
              {cv.direccion} {datos.direccion}
            </h1>
            <h1 className="flex items-center justify-start gap-1">
              {cv.dni} {datos.dni}
            </h1>
            <h1 className="flex items-center justify-start gap-1">
              {cv.celular} {datos.celular}
            </h1>
            <h1 className="flex items-center justify-start gap-1">
              {cv.estadocivil} {datos.estadocivil}
            </h1>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
