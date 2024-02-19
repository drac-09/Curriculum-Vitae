"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function DatosPersonales(props) {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const existe = Cookies.get("InformacionPersonal");
    if (existe) setDatos(JSON.parse(existe));
  }, []);

  return (
    <>
      {datos.length !== 0 ? (
        <div>
          <h2 className="font-black mb-1">CONTACTO</h2>
          <div>
            <h1>{datos.correo}</h1>
            <h1>{datos.direccion}</h1>
            {/* <h1>{datos.dni}</h1> */}
            <h1>{datos.celular}</h1>
            <h1>{datos.estadocivil}</h1>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
