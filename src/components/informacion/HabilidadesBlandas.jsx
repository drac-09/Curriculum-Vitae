"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function HabilidadesBlandas({
  icono,
  classTitulo,
  classBloque,
}) {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const existe = Cookies.get("Competencias");
    if (existe) {
      const tmp = JSON.parse(existe);
      const h = tmp.habilidades;
      setDatos(h);
    }
  }, []);

  const ordenarPorLongitud = (a, b) => {
    return a.habilidad.length - b.habilidad.length;
  };

  return (
    <>
      {datos.length !== 0 ? (
        <div className={`${classBloque}`}>
          <h2 className={`${classTitulo} font-bold mb-1`}>
            HABILIDADES BLANDAS
          </h2>
          {datos
            .slice()
            .sort((a, b) => ordenarPorLongitud(a, b))
            .map((habilidad) => (
              <div key={habilidad.id}>
                <h1>
                  {icono} {habilidad.habilidad}
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
