"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Experiencia({
  icono,
  classTitulo,
  classBloque,
  classBody,
}) {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const existe = Cookies.get("ExperienciaLaboral");
    if (existe) {
      setDatos(JSON.parse(existe));
    }
  }, []);

  const ordenarPorLongitud = (a, b) => {
    return a.tarea.length - b.tarea.length;
  };

  return (
    <>
      {datos.length !== 0 ? (
        <div className={`${classBloque}`}>
          <h2 className={`${classTitulo} font-bold mb-1`}>
            EXPERIENCIA LABORAL
          </h2>
          {datos.map((exp) => (
            <div key={exp.id} className={`${classBody}`}>
              <div className="flex gap-1">
                <h1 className="font-semibold">{exp.empresa}</h1>
                <h1>|</h1>
                <h1>
                  {exp.mesInicio} {exp.anioInicio} - {exp.mesFinal}{" "}
                  {exp.anioFinal}
                </h1>
              </div>
              <h1>{exp.cargo}</h1>
              {exp.tareas
                .slice()
                .sort((a, b) => ordenarPorLongitud(a, b))
                .map((tarea) => (
                  <div key={tarea.id} className="max-w-max flex gap-3">
                    <div className="flex gap-1 pl-2">
                      <h1>
                        {icono} {tarea.tarea}
                      </h1>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
