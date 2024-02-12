"use client";
import Cookies from "js-cookie";
import fechas from "@/data/fechas";
import { useEffect, useState, useRef } from "react";

export default function InformacionAcademica() {
  const [button, setButton] = useState(true);
  const [bAgregar, setBAgregar] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animacion, setAnimacion] = useState();
  const formulario = useRef(null);

  const [niveles, setNiveles] = useState([]);
  const [identificador, setIdentificador] = useState("");
  const [nivel, setNivel] = useState("Secundaria");
  const [centro, setCentro] = useState("");
  const [titulo, setTitulo] = useState("");
  const [mesInicio, setMesInicio] = useState("Enero");
  const [anioInicio, setAnioInicio] = useState(2024);
  const [mesFinal, setMesFinal] = useState("Diciembre");
  const [anioFinal, setAnioFinal] = useState(2024);

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

  useEffect(() => {
    verificarCamposVacios();
  });

  // Guarda los datos
  function guardar() {
    if (!bAgregar) {
      const fecha = new Date();
      const id = fecha.getTime().toString();

      const data = cargarDatos(id);
      const tmp = JSON.parse(Cookies.get("InformacionAcademica"));
      tmp.push(data);
      Cookies.set("InformacionAcademica", JSON.stringify(tmp));

      limpiar();
      obtenerNivelesDesdeCookies();
      datosPorDefecto();
    } else {
      setVisible(true);
      setAnimacion("animate-fade-right");
      setTimeout(() => {
        setAnimacion(
          "animate-fade-right animate-reverse animate-delay-[3000ms]"
        );
      }, 3000);
      setTimeout(() => {
        setVisible(false);
      }, 4000);
    }
  }

  const irAlFormulario = () => {
    formulario.current.scrollIntoView({ behavior: "smooth" });
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
    irAlFormulario();
  }

  function actualizar() {
    const nivel = cargarDatos();
    const index = niveles.findIndex((objeto) => objeto.id === identificador);
    if (index !== -1) {
      niveles[index] = { ...niveles[index], ...nivel };
      Cookies.set("InformacionAcademica", JSON.stringify(niveles));
      limpiar();
      obtenerNivelesDesdeCookies();
      datosPorDefecto();
    }

    setTimeout(() => {
      setButton(true);
    }, 500);
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

  function cancelar() {
    limpiar();
    datosPorDefecto();
    setButton(true);
  }

  function cargarDatos(id) {
    if (id === undefined) {
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
      return nuevoObjeto;
    } else {
      const nuevoObjeto = {
        id: id,
        nivel: nivel,
        centro: centro,
        titulo: titulo,
        mesInicio: mesInicio,
        anioInicio: anioInicio,
        mesFinal: mesFinal,
        anioFinal: anioFinal,
      };
      return nuevoObjeto;
    }
  }

  function verificarCamposVacios() {
    const todasVacias = !centro || !titulo;

    if (todasVacias) {
      setBAgregar(true);
    } else {
      setBAgregar(false);
    }
  }

  function datosPorDefecto() {
    setNivel("Secundaria");
    setMesInicio("Enero");
    setAnioInicio(2024);
    setMesFinal("Diciembre");
    setAnioFinal(2024);
  }

  return (
    <div>
      <form ref={formulario}>
        <h5 className="Titulo">Información Academica</h5>
        <hr className="Hr" />
        <p className="text-sm text-gray-200">
          En esta sección, debes presentar a los empleadores una visión general
          de tu educación y tus logros académicos. Esto es importante porque les
          ayuda a evaluar si eres adecuado para el puesto. Asegúrate de incluir
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
              onChange={(e) => setNivel(e.target.value)}
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
              onChange={(e) => setCentro(e.target.value)}
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
              onChange={(e) => setTitulo(e.target.value)}
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
                onChange={(e) => setMesInicio(e.target.value)}
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
                onChange={(e) => setAnioInicio(e.target.value)}
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
                onChange={(e) => setMesFinal(e.target.value)}
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
                onChange={(e) => setAnioFinal(e.target.value)}
                className="Select"
              >
                {anios.map((anio, index) => (
                  <option key={index} value={anio} defaultValue={2024}>
                    {anio}
                  </option>
                ))}
              </select>
            </div>
          </section>
        </div>

        <div className="flex items-end gap-3 mt-10">
          {button ? (
            <button
              type="button"
              onClick={() => {
                guardar();
              }}
              className="Button"
            >
              Agregar
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  actualizar();
                }}
                className="Button"
              >
                Actualizar
              </button>
              <button
                className="Button"
                onClick={() => {
                  cancelar();
                }}
              >
                Cancelar
              </button>
            </div>
          )}
          {visible && (
            <h1 id="mensaje" className={`MsjFallo ${animacion}`}>
              Por favor ingresar: Centro de estudio y Titulo obtenido.
            </h1>
          )}
        </div>
      </form>
      <br />
      <br />

      <h5 className="Titulo">Datos Obtenidos</h5>
      <hr className="Hr" />
      <div className="flex-grow">
        {niveles.map((nivel) => (
          <div key={nivel.id} className="Card">
            <section className="text-sm">
              <div className="flex gap-3 w-full">
                <div className="w-1/3 Border-l">
                  <h1>Nivel Educativo</h1>
                  <h1>Centro Educativo</h1>
                  <h1>Titulo Obtenido</h1>
                  <h1>Fecha de Inicio</h1>
                  <h1>Fecha de Finalización</h1>
                </div>
                <div className="w-2/3">
                  <h1>{nivel.nivel}</h1>
                  <h1>{nivel.centro}</h1>
                  <h1>{nivel.titulo}</h1>
                  <h1>
                    {nivel.mesInicio} de {nivel.anioInicio}
                  </h1>
                  <h1>
                    {nivel.mesFinal} de {nivel.anioFinal}
                  </h1>
                </div>
              </div>
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
          </div>
        ))}
      </div>
    </div>
  );
}
