"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function DatosPersonales() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const existe = Cookies.get("InformacionPersonal");
    if (existe) setDatos(JSON.parse(existe));
  }, []);

  return (
    <div>
      <h1>{datos.correo}</h1>
      <h1>{datos.direccion}</h1>
      <h1>{datos.celular}</h1>
      <h1>{datos.dni}</h1>
      <h1>{datos.estadocivil}</h1>
    </div>
  );
}
