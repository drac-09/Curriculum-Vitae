"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Educacion({ classTitulo, classBloque }) {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const existe = Cookies.get("InformacionAcademica");
    if (existe) {
      setDatos(JSON.parse(existe));
    }
  }, []);

  return (
    <>
      {datos.length !== 0 ? (
        <div className={`${classBloque}`}>
          <h2 className={`${classTitulo} font-bold mb-1`}>EDUCACIÓN</h2>
          {datos.map((edu, index) => (
            <div
              key={edu.id}
              className={`${index < datos.length - 1 && "mb-2"}`}
            >
              <div className="flex flex-wrap">
                <h1 className="font-semibold">{edu.centro}</h1>
                <h1>&nbsp;|&nbsp;</h1>
                <h1>
                  {edu.mesInicio} {edu.anioInicio} - {edu.mesFinal}{" "}
                  {edu.anioFinal}
                </h1>
              </div>
              <h1 className="">{edu.titulo}</h1>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
