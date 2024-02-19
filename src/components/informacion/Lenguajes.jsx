"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Lenguajes(props) {
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
        <div>
          <hr className="my-2" />
          <div>
            <h2 className="font-black mb-1">LENGUAJES</h2>
            {datos
              .slice()
              .sort((a, b) => ordenarPorLongitud(a, b))
              .map((lenguaje) => (
                <div key={lenguaje.id}>
                  <h1>
                    {props.icono} {lenguaje.lenguaje}
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
