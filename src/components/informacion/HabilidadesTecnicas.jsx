"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function HabilidadesTecnicas({
  icono,
  classTitulo,
  classBloque,
}) {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const existe = Cookies.get("Competencias");
    if (existe) {
      const tmp = JSON.parse(existe);
      const h = tmp.aptitudes;
      setDatos(h);
    }
  }, []);

  const ordenarPorLongitud = (a, b) => {
    return a.aptitud.length - b.aptitud.length;
  };

  return (
    <>
      {datos.length !== 0 ? (
        <div className={`${classBloque}`}>
          <h2 className={`${classTitulo} font-bold mb-1`}>
            HABILIDADES TÉCNICAS
          </h2>
          {datos
            .slice()
            .sort((a, b) => ordenarPorLongitud(a, b))
            .map((aptitud) => (
              <div key={aptitud.id}>
                <h1>
                  {icono} {aptitud.aptitud}
                </h1>
              </div>
            ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
