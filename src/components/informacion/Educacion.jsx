"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Educacion(props) {
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
        <div>
          <hr className="my-2" />
          <div>
            <h2 className="font-bold mb-1">EDUCACIÓN</h2>
            {datos.map((edu, index) => (
              <div key={edu.id}>
                <div className="flex gap-1">
                  <h1 className="font-semibold">{edu.centro}</h1>
                  <h1>|</h1>
                  <h1>
                    {edu.mesInicio} {edu.anioInicio} - {edu.mesFinal}{" "}
                    {edu.anioFinal}
                  </h1>
                </div>
                <h1 className="">{edu.titulo}</h1>
                {index < datos.length - 1 && <hr className="Hr" />}
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
