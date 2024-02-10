"use client";
import { useState } from "react";
import Cookies from "js-cookie";

export default function InformacionPersonal() {
  const [visible, setVisible] = useState(false);

  const handlerGuardar = (e) => {
    e.preventDefault();
    const data = {
      sobremi: e.target.sobremi.value,
      nombre: e.target.nombre.value,
      direccion: e.target.direccion.value,
      correo: e.target.correo.value,
      celular: e.target.celular.value,
      dni: e.target.dni.value,
      estadocivil: e.target.estadocivil.value,
    };

    Cookies.set("InformacionPersonal", JSON.stringify(data));
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
    // const ver = JSON.parse(Cookies.get().InformacionPersonal);
    // console.log(ver);
  };

  return (
    <div>
      <form action="" onSubmit={handlerGuardar}>
        <h5>Acerca de mi.</h5>
        <hr className="opacity-20 my-1" />
        <p className="text-sm text-gray-300">
          En esta sección coloca una breve descripción que resume tus
          habilidades y logros profesionales. Destaca tus puntos fuertes y
          objetivos de carrera en pocas palabras, manteniendo un tono
          profesional y positivo.
        </p>
        <br />
        <textarea
          type="text"
          id="sobremi"
          className="w-full md:w-3/4 h-20 my-3 p-3 rounded-md bg-gray-800 text-sm resize-none"
        />
        <br />
        <br />
        <h5>Datos Personales</h5>
        <hr className="opacity-20 my-1" />
        <p className="text-sm text-gray-300">
          Proporciona esta información de contacto de manera clara y precisa
          para que los empleadores puedan comunicarse contigo fácilmente.
        </p>
        <br />
        <div className="flex flex-col gap-2 mt-2 text-sm">
          <div className="flex md:w-3/4">
            <label htmlFor="nombre" className="w-1/3">
              Nombre completo:
            </label>
            <input type="text" id="nombre" className="Input w-2/3" />
          </div>
          <div className="flex md:w-3/4">
            <label htmlFor="direccion" className="w-1/3">
              Dirección:
            </label>
            <input type="text" id="direccion" className="Input w-2/3" />
          </div>
          <div className="flex md:w-3/4">
            <label htmlFor="correo" className="w-1/3">
              E-mail:
            </label>
            <input
              type="email"
              id="correo"
              placeholder="correoelectronico@server.com"
              className="Input w-2/3"
            />
          </div>
          <div className="flex md:w-3/4">
            <label htmlFor="dni" className="w-1/3">
              DNI:
            </label>
            <input
              type="text"
              id="dni"
              pattern="\d{4}-\d{4}-\d{5}"
              placeholder="0000-0000-00000"
              className="Input w-1/3"
            />
          </div>
          <div className="flex md:w-2/4">
            <label htmlFor="celular" className="w-1/3 md:w-1/2">
              Celular:
            </label>
            <input
              type="text"
              id="celular"
              pattern="\d{4}-\d{4}"
              placeholder="9999-9999"
              className="Input w-1/3"
            />
          </div>
          <div className="flex md:w-2/4">
            <label htmlFor="estadocivil" className="w-1/3 md:w-1/2">
              Estado Civil:
            </label>
            <select name="" id="estadocivil" className="Select w-1/3">
              <option value="Soltero">Soltero</option>
              <option value="Soltera">Soltera</option>
              <option value="Casado">Casado</option>
              <option value="Casada">Casada</option>
              <option value="Viudo">Viudo</option>
              <option value="Viuda">Viuda</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Divorciada">Divorciada</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 mt-10">
          <button type="submit" className="Button">
            Guardar
          </button>

          {visible && (
            <h1 id="mensaje" className={`MsjExito`}>
              Datos actualizados con éxito!!!
            </h1>
          )}
        </div>
      </form>
    </div>
  );
}
