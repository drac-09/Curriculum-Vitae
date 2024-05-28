"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function InformacionPersonal() {
  const [sobremi, setSobremi] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [profesion, setProfesion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [dni, setDni] = useState("");
  const [estadocivil, setEstadocivil] = useState("");

  const [visible, setVisible] = useState(false);
  const [animacion, setAnimacion] = useState();

  useEffect(() => {
    const info = {
      sobremi: "",
      nombre: "",
      apellido: "",
      profesion: "",
      direccion: "",
      correo: "",
      celular: "",
      dni: "",
      estadocivil: "",
    };
    const existe = Cookies.get("InformacionPersonal");
    if (!existe)
      Cookies.set("InformacionPersonal", JSON.stringify(info), {
        expires: 3650,
      });
    if (existe) cargarDatos(JSON.parse(existe));
  }, []);

  // const obtenerDatosDesdeCookies = () => {
  //   const nivelesDesdeCookies = Cookies.get("InformacionPersonal");
  //   if (nivelesDesdeCookies) {
  //     cargarDatos(JSON.parse(nivelesDesdeCookies));
  //   }
  // };

  function guardar() {
    const data = nuevo();
    Cookies.set("InformacionPersonal", JSON.stringify(data), { expires: 3650 });

    setVisible(true);
    setAnimacion("animate-fade-right");
    setTimeout(() => {
      setAnimacion("animate-fade-right animate-reverse animate-delay-[2000ms]");
    }, 2000);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }

  function cargarDatos(data) {
    setSobremi(data.sobremi);
    setNombre(data.nombre);
    setApellido(data.apellido);
    setProfesion(data.profesion);
    setDireccion(data.direccion);
    setCorreo(data.correo);
    setCelular(data.celular);
    setDni(data.dni);
    setEstadocivil(data.estadocivil);
  }

  function nuevo() {
    const info = {
      sobremi: sobremi !== undefined ? sobremi : "",
      nombre: nombre !== undefined ? nombre : "",
      apellido: apellido !== undefined ? apellido : "",
      profesion: profesion !== undefined ? profesion : "",
      direccion: direccion !== undefined ? direccion : "",
      correo: correo !== undefined ? correo : "",
      celular: celular !== undefined ? celular : "",
      dni: dni !== undefined ? dni : "",
      estadocivil: estadocivil !== undefined ? estadocivil : "",
    };
    return info;
  }

  return (
    <div>
      <form action="">
        <h5 className="Titulo">Acerca de mi.</h5>
        <hr className="opacity-20 my-1" />
        <p>
          En esta sección coloca una breve descripción que resume tus
          habilidades y logros profesionales. Destaca tus puntos fuertes y
          objetivos de carrera en pocas palabras, manteniendo un tono
          profesional y positivo.
        </p>
        <br />
        <textarea
          type="text"
          id="sobremi"
          value={sobremi}
          onChange={(e) => setSobremi(e.target.value)}
          className="w-full h-24 my-3 p-3 rounded-md bg-gray-800 resize-none"
        />
        <br />
        <br />
        <h5 className="Titulo">Datos Personales</h5>
        <hr className="opacity-20 my-1" />
        <p>
          Proporciona esta información de contacto de manera clara y precisa
          para que los empleadores puedan comunicarse contigo fácilmente.
        </p>
        <br />
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex md:w-3/4">
            <label htmlFor="nombre" className="w-1/3">
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="Input w-1/3"
              placeholder="Primer nombre"
              autoComplete="off"
            />
          </div>
          <div className="flex md:w-3/4">
            <label htmlFor="apellido" className="w-1/3">
              Apellido:
            </label>
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="Input w-1/3"
              placeholder="Primer apellido"
              autoComplete="off"
            />
          </div>
          <div className="flex md:w-3/4">
            <label htmlFor="profesion" className="w-1/3">
              Profesión:
            </label>
            <input
              type="text"
              id="profesion"
              value={profesion}
              onChange={(e) => setProfesion(e.target.value)}
              className="Input w-2/3"
              placeholder="Profesión u Oficio"
              autoComplete="off"
            />
          </div>
          <div className="flex md:w-3/4">
            <label htmlFor="direccion" className="w-1/3">
              Dirección:
            </label>
            <input
              type="text"
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="Input w-2/3"
              placeholder="Dirección de su domicilio"
              autoComplete="off"
            />
          </div>
          <div className="flex md:w-3/4">
            <label htmlFor="correo" className="w-1/3">
              E-mail:
            </label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correoelectronico@server.com"
              className="Input w-2/3"
              autoComplete="off"
            />
          </div>
          <div className="flex md:w-3/4">
            <label htmlFor="dni" className="w-1/3">
              DNI:
            </label>
            <input
              type="text"
              id="dni"
              value={dni}
              maxLength={15}
              onChange={(e) => setDni(e.target.value)}
              pattern="\d{4}-\d{4}-\d{5}"
              placeholder="0000-0000-00000"
              className="Input w-3/7 lg:w-2/5"
              autoComplete="off"
            />
          </div>
          <div className="flex md:w-2/4">
            <label htmlFor="celular" className="w-1/3 md:w-1/2">
              Celular:
            </label>
            <input
              type="text"
              id="celular"
              value={celular}
              maxLength={9}
              pattern="[0-9]{4}-[0-9]{4}"
              onChange={(e) => setCelular(e.target.value)}
              placeholder="9999-9999"
              className="Input w-2/5"
              autoComplete="off"
            />
          </div>
          <div className="flex md:w-2/4">
            <label htmlFor="estadocivil" className="w-1/3 md:w-1/2">
              Estado Civil:
            </label>
            <select
              name=""
              id="estadocivil"
              value={estadocivil}
              onChange={(e) => setEstadocivil(e.target.value)}
              className="Select w-1/3"
            >
              <option value="">Omitir</option>
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
        <div className="flex items-start gap-3 mt-10">
          <button
            type="button"
            onClick={() => {
              guardar();
            }}
            className="Button"
          >
            Actualizar
          </button>

          {visible && (
            <h1 id="mensaje" className={`MsjExito ${animacion}`}>
              Datos actualizados con éxito!!!
            </h1>
          )}
        </div>
      </form>
      <br />
    </div>
  );
}
