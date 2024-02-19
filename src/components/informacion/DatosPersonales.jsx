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
            <div className="flex items-center justify-start gap-1">
              {cv.correo}
              <h1>{datos.correo}</h1>
            </div>
            <div className="flex items-center justify-start gap-1">
              {cv.direccion}
              <h1>{datos.direccion}</h1>
            </div>
            <div className="flex items-center justify-start gap-1">
              {cv.dni}
              <h1>{datos.dni}</h1>
            </div>
            <div className="flex items-center justify-start gap-1">
              {cv.celular}
              <h1>{datos.celular}</h1>
            </div>
            <div className="flex items-center justify-start gap-1">
              {cv.estadocivil}
              <h1>{datos.estadocivil}</h1>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
