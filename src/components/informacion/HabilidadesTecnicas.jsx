"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function HabilidadesTecnicas(props) {
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
    return a.length - b.length;
  };

  return (
    <>
      {datos.length !== 0 ? (
        <div>
          <hr className="my-2" />
          <div>
            <h2 className="font-black mb-1">HABILIDADES TECNICAS</h2>
            {datos
              .slice()
              .sort((a, b) => ordenarPorLongitud(a, b))
              .map((aptitud) => (
                <div key={aptitud.id}>
                  <h1>
                    {props.icono} {aptitud.aptitud}
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
