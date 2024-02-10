"use client";
import Cookies from "js-cookie";
import fechas from "@/data/fechas";
import React, { useEffect, useState } from "react";

export default function InformacionAcademica() {
  const [button, setButton] = useState(true);
  const [niveles, setNiveles] = useState([]);
  const [identificador, setIdentificador] = useState("");
  const [nivel, setNivel] = useState("");
  const [centro, setCentro] = useState("");
  const [titulo, setTitulo] = useState("");
  const [mesInicio, setMesInicio] = useState("");
  const [anioInicio, setAnioInicio] = useState();
  const [mesFinal, setMesFinal] = useState("");
  const [anioFinal, setAnioFinal] = useState();

  const meses = fechas.meses;
  const anios = fechas.anios;

  useEffect(() => {
    const niveles = [];
    const existe = Cookies.get("InformacionAcademica");
    if (!existe) Cookies.set("InformacionAcademica", JSON.stringify(niveles));
    if (existe) obtenerNivelesDesdeCookies();
  }, []);

  // Obteniendo Datos desde las Cookies
  const obtenerNivelesDesdeCookies = () => {
    const nivelesDesdeCookies = Cookies.get("InformacionAcademica");
    if (nivelesDesdeCookies) {
      setNiveles(JSON.parse(nivelesDesdeCookies));
    }
  };

  // Manejar cambios en los campos <select>
  const selectNivel = (event) => {
    setNivel(event.target.value);
  };
  const selectMesInicio = (event) => {
    setMesInicio(event.target.value);
  };
  const selectAnioInicio = (event) => {
    setAnioInicio(event.target.value);
  };
  const selectMesFinal = (event) => {
    setMesFinal(event.target.value);
  };
  const selectAnioFinal = (event) => {
    setAnioFinal(event.target.value);
  };
  const selectCentro = (event) => {
    setCentro(event.target.value);
  };
  const selectTitulo = (event) => {
    setTitulo(event.target.value);
  };

  // Guarda los datos
  const Guardar = (e) => {
    e.preventDefault();
    const fecha = new Date();
    const id = fecha.getTime().toString();

    const data = {
      id: id,
      nivel: e.target.nivel.value,
      centro: e.target.centro.value,
      titulo: e.target.titulo.value,
      mesInicio: e.target.mesInicio.value,
      anioInicio: e.target.anioInicio.value,
      mesFinal: e.target.mesFinal.value,
      anioFinal: e.target.anioFinal.value,
    };

    const tmp = JSON.parse(Cookies.get("InformacionAcademica"));
    tmp.push(data);
    Cookies.set("InformacionAcademica", JSON.stringify(tmp));

    limpiar();
    obtenerNivelesDesdeCookies();
  };

  function obtener(id) {
    setButton(false);
    const tmp = niveles.find((objeto) => objeto.id === id);
    setIdentificador(tmp.id);
    setNivel(tmp.nivel);
    setCentro(tmp.centro);
    setTitulo(tmp.titulo);
    setMesInicio(tmp.mesInicio);
    setAnioInicio(tmp.anioInicio);
    setMesFinal(tmp.mesFinal);
    setAnioFinal(tmp.anioFinal);
  }

  function actualizar() {
    const nuevoObjeto = {
      id: identificador,
      nivel: nivel,
      centro: centro,
      titulo: titulo,
      mesInicio: mesInicio,
      anioInicio: anioInicio,
      mesFinal: mesFinal,
      anioFinal: anioFinal,
    };

    const index = niveles.findIndex((objeto) => objeto.id === identificador);
    if (index !== -1) {
      niveles[index] = { ...niveles[index], ...nuevoObjeto };
      Cookies.set("InformacionAcademica", JSON.stringify(niveles));
      limpiar();
      obtenerNivelesDesdeCookies();
    }
  }

  function eliminar(id) {
    const index = niveles.findIndex((objeto) => objeto.id === id);
    if (index !== -1) {
      niveles.splice(index, 1);
      Cookies.set("InformacionAcademica", JSON.stringify(niveles));
      obtenerNivelesDesdeCookies();
    }
  }

  function limpiar() {
    setIdentificador("");
    setNivel("");
    setCentro("");
    setTitulo("");
    setMesInicio("");
    setAnioInicio();
    setMesFinal("");
    setAnioFinal();
  }

  return (
    <div>
      <form action="" onSubmit={Guardar}>
        <h5>Información Academica</h5>
        <hr className="Hr" />
        <p className="text-sm text-gray-300">
          En esta sección proporciona a los empleadores una visión general de tu
          formación y tus logros académicos, lo que puede ser crucial para
          determinar tu idoneidad para el puesto. Asegúrate de incluir
          información precisa y relevante sobre tus estudios.
        </p>
        <br />
        <div className="flex flex-col gap-2 mt-2 text-sm">
          <section className="flex md:w-2/4">
            <label htmlFor="nivel" className="w-1/3 md:w-1/2">
              Nivel Educativo:
            </label>
            <select
              id="nivel"
              value={nivel}
              onChange={selectNivel}
              className="Select w-2/2"
            >
              <option value="Secundaria">Secundaria</option>
              <option value="Superior">Superior</option>
              <option value="Especializacion">Especialización</option>
              <option value="Maestria">Maestría</option>
              <option value="Doctorado">Doctorado</option>
            </select>
          </section>
          <section className="flex md:w-3/4">
            <label htmlFor="centro" className="w-1/3">
              Centro de Estudio:
            </label>
            <input
              type="text"
              id="centro"
              value={centro}
              onChange={selectCentro}
              className="Input w-2/3"
            />
          </section>
          <section className="flex md:w-3/4">
            <label htmlFor="titulo" className="w-1/3">
              Titulo Obtenido:
            </label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={selectTitulo}
              className="Input w-2/3"
            />
          </section>
          <section className="flex md:w-2/4">
            <label htmlFor="f-inicio" className="w-1/3 md:w-1/2">
              Fecha Inicio:
            </label>
            <div className="w-1/3 flex gap-2">
              <select
                id="mesInicio"
                name="mes"
                value={mesInicio}
                onChange={selectMesInicio}
                className="Select"
              >
                {meses.map((mes, index) => (
                  <option key={index} value={mes}>
                    {mes}
                  </option>
                ))}
              </select>

              <select
                id="anioInicio"
                name="anio"
                value={anioInicio}
                onChange={selectAnioInicio}
                className="Select"
              >
                {anios.map((anio, index) => (
                  <option key={index} value={anio}>
                    {anio}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <section className="flex md:w-2/4">
            <label htmlFor="f-final" className="w-1/3 md:w-1/2">
              Fecha Finalización:
            </label>
            <div className="w-1/3 flex gap-2">
              <select
                id="mesFinal"
                name="mes"
                value={mesFinal}
                onChange={selectMesFinal}
                className="Select"
              >
                {meses.map((mes, index) => (
                  <option key={index} value={mes}>
                    {mes}
                  </option>
                ))}
              </select>

              <select
                id="anioFinal"
                name="anio"
                value={anioFinal}
                onChange={selectAnioFinal}
                className="Select"
              >
                {anios.map((anio, index) => (
                  <option key={index} value={anio}>
                    {anio}
                  </option>
                ))}
              </select>
            </div>
          </section>
        </div>

        <div className="flex flex-col items-start gap-3 mt-10">
          {button ? (
            <button type="submit" className="Button">
              Agregar
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                actualizar();
              }}
              className="Button"
            >
              Actualizar
            </button>
          )}
        </div>
      </form>
      <br />

      <div className="flex-grow h-[40.5vh] overflow-y-auto border-[1px] border-gray-800 rounded-lg p-5">
        {niveles.map((nivel) => (
          <div key={nivel.id}>
            <section className="text-sm">
              <table className="w-3/4">
                <tbody>
                  <tr>
                    <td className="w-1/3">Nivel Educativo:</td>
                    <td className="w-3/3">{nivel.nivel}</td>
                  </tr>
                  <tr>
                    <td>Centro Educativo:</td>
                    <td className="truncate">{nivel.centro}</td>
                  </tr>
                  <tr>
                    <td>Titulo Obtenido:</td>
                    <td className="flex-wrap">{nivel.titulo}</td>
                  </tr>
                  <tr>
                    <td>Fecha de Inicio:</td>
                    <td>
                      {nivel.mesInicio} de {nivel.anioInicio}
                    </td>
                  </tr>
                  <tr>
                    <td>Fecha de Finalización:</td>
                    <td>
                      {nivel.mesFinal} de {nivel.anioFinal}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex-grow flex justify-end gap-3">
                <button
                  className="Button mt-2"
                  type="button"
                  onClick={() => {
                    obtener(nivel.id);
                  }}
                >
                  Editar
                </button>
                <button
                  className="Button mt-2"
                  type="button"
                  onClick={() => {
                    eliminar(nivel.id);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </section>
            <hr className="Hr my-3" />
          </div>
        ))}
      </div>
    </div>
  );
}
