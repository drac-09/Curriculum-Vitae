"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function RefProfesionales() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const existe = Cookies.get("ReferenciasProfesionales");
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
            <h2 className="font-black mb-1">REFERENCIAS PROFESIONALES</h2>
            {datos.map((ref, index) => (
              <div key={ref.id} className="mb-2">
                <h1 className="font-semibold">{ref.nombre}</h1>
                <div className="flex gap-1">
                  <h1>{ref.empresa}</h1>
                  <h1 className="font-bold">|</h1>
                  <h1>{ref.cargo}</h1>
                </div>
                <h1 className="">Celular: {ref.celular}</h1>
                {/* {index < datos.length - 1 && <hr className="Hr" />} */}
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
