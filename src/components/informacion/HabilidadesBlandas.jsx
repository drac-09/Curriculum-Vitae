"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function HabilidadesBlandas(props) {
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
    return a.length - b.length;
  };

  return (
    <>
      {datos.length !== 0 ? (
        <div>
          <hr className="my-2" />
          <div>
            <h2 className="font-black mb-1">HABILIDADES BLANDAS</h2>
            {datos
              .slice()
              .sort((a, b) => ordenarPorLongitud(a, b))
              .map((habilidad) => (
                <div key={habilidad.id}>
                  <h1>
                    {props.icono} {habilidad.habilidad}
                  </h1>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
