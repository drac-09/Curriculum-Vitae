"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Lenguajes({ icono, classTitulo, classBloque }) {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const existe = Cookies.get("Competencias");
    if (existe) {
      const tmp = JSON.parse(existe);
      const h = tmp.lenguajes;
      setDatos(h);
    }
  }, []);

  const ordenarPorLongitud = (a, b) => {
    return a.length - b.length;
  };

  return (
    <>
      {datos.length !== 0 ? (
        <div className={`${classBloque}`}>
          <h2 className={`${classTitulo} font-bold mb-1`}>LENGUAJES</h2>
          {datos
            .slice()
            .sort((a, b) => ordenarPorLongitud(a, b))
            .map((lenguaje) => (
              <div key={lenguaje.id}>
                <h1>
                  {icono} {lenguaje.lenguaje}
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
