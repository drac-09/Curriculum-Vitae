"use client";
import Cookies from "js-cookie";
import fechas from "@/data/fechas";
import { useEffect, useState, useRef } from "react";

export default function ExperienciaLaboral() {
  const [button, setButton] = useState(true);
  const [bAgregar, setBAgregar] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animacion, setAnimacion] = useState();
  const formulario = useRef(null);

  const [experiencia, setExperiencia] = useState([]);
  const [identificador, setIdentificador] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [mesInicio, setMesInicio] = useState("Enero");
  const [anioInicio, setAnioInicio] = useState(2024);
  const [mesFinal, setMesFinal] = useState("Diciembre");
  const [anioFinal, setAnioFinal] = useState(2024);

  const meses = fechas.meses;
  const anios = fechas.anios;

  useEffect(() => {
    const experiencia = [];
    const existe = Cookies.get("ExperienciaLaboral");
    if (!existe) Cookies.set("ExperienciaLaboral", JSON.stringify(experiencia));
    if (existe) obtenerExperienciaCookies();
  }, []);

  const obtenerExperienciaCookies = () => {
    const experienciaCookies = Cookies.get("ExperienciaLaboral");
    if (experienciaCookies) {
      setExperiencia(JSON.parse(experienciaCookies));
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
      const tmp = JSON.parse(Cookies.get("ExperienciaLaboral"));
      tmp.push(data);
      Cookies.set("ExperienciaLaboral", JSON.stringify(tmp));

      limpiar();
      obtenerExperienciaCookies();
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
    const tmp = experiencia.find((objeto) => objeto.id === id);
    setIdentificador(tmp.id);
    setDescripcion(tmp.descripcion);
    setEmpresa(tmp.empresa);
    setCargo(tmp.cargo);
    setMesInicio(tmp.mesInicio);
    setAnioInicio(tmp.anioInicio);
    setMesFinal(tmp.mesFinal);
    setAnioFinal(tmp.anioFinal);
    irAlFormulario();
  }

  function actualizar() {
    const descripcion = cargarDatos();
    const index = experiencia.findIndex(
      (objeto) => objeto.id === identificador
    );
    if (index !== -1) {
      experiencia[index] = { ...experiencia[index], ...descripcion };
      Cookies.set("ExperienciaLaboral", JSON.stringify(experiencia));
      limpiar();
      obtenerExperienciaCookies();
      datosPorDefecto();
    }

    setTimeout(() => {
      setButton(true);
    }, 500);
  }

  function eliminar(id) {
    const index = experiencia.findIndex((objeto) => objeto.id === id);
    if (index !== -1) {
      experiencia.splice(index, 1);
      Cookies.set("ExperienciaLaboral", JSON.stringify(experiencia));
      obtenerExperienciaCookies();
    }
  }

  function limpiar() {
    setIdentificador("");
    setDescripcion("");
    setEmpresa("");
    setCargo("");
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
    let valorUnico = null;
    if (id === undefined) {
      valorUnico = identificador;
    } else {
      valorUnico = id;
    }

    const nuevoObjeto = {
      id: valorUnico,
      descripcion: descripcion,
      empresa: empresa,
      cargo: cargo,
      mesInicio: mesInicio,
      anioInicio: anioInicio,
      mesFinal: mesFinal,
      anioFinal: anioFinal,
    };
    return nuevoObjeto;
  }

  function verificarCamposVacios() {
    const todasVacias = !empresa || !cargo;

    if (todasVacias) {
      setBAgregar(true);
    } else {
      setBAgregar(false);
    }
  }

  function datosPorDefecto() {
    setMesInicio("Enero");
    setAnioInicio(2024);
    setMesFinal("Diciembre");
    setAnioFinal(2024);
  }

  return (
    <div>
      <form ref={formulario}>
        <h5 className="Titulo">Experiencia Laboral</h5>
        <hr className="Hr" />
        <p className="text-sm text-gray-200">
          En esta sección, resume tus responsabilidades y las actividades que
          llevabas a cabo en tus trabajos anteriores. Es crucial que comuniques
          de manera clara y precisa las tareas que realizabas en cada puesto de
          trabajo.
        </p>
        <p className="Alerta text-sm font-semibold">
          Recomendación: Empiece desde los mas recientes a los mas antiguos.
        </p>
        <br />
        <div className="flex flex-col gap-2 mt-2 text-sm">
          <section className="flex md:w-3/4">
            <label htmlFor="empresa" className="w-1/3">
              Nombre de la Empresa:
            </label>
            <input
              type="text"
              id="empresa"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              className="Input w-2/3"
            />
          </section>
          <section className="flex md:w-3/4">
            <label htmlFor="cargo" className="w-1/3">
              Cargo:
            </label>
            <input
              type="text"
              id="cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="Input w-2/3"
              placeholder="Puesto que ocupaste en la empresa"
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
          <section className="flex md:w-full">
            <label htmlFor="descripcion" className="w-1/3 md:w-1/4">
              Descripción:
            </label>
            <textarea
              name=""
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="h-20 w-2/3 md:w-3/4 p-3 rounded-md bg-gray-800 text-sm resize-none"
              placeholder="Describe brevemente las responsabilidades y logros relevantes durante tu tiempo en este puesto."
            ></textarea>
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
              Por favor ingresar: Nombre de la Empresa y el Cargo.
            </h1>
          )}
        </div>
      </form>
      <br />
      <br />

      <h5 className="Titulo">Datos Obtenidos</h5>
      <hr className="Hr" />
      <div className="flex-grow">
        {experiencia.map((exp) => (
          <div key={exp.id} className="Card">
            <section className="text-xs md:text-sm">
              <div className="flex gap-3 w-full">
                <div className="w-1/3 md:w-1/4 Border-r">
                  <h1>Empresa</h1>
                  <h1>Cargo</h1>
                  <h1>Fecha-Inicio</h1>
                  <h1>Fecha-Finalización</h1>
                  <h1>Descripción</h1>
                </div>
                <div className="w-2/3 truncate">
                  <h1>{exp.empresa}</h1>
                  <h1>{exp.cargo}</h1>
                  <h1>
                    {exp.mesInicio} de {exp.anioInicio}
                  </h1>
                  <h1>
                    {exp.mesFinal} de {exp.anioFinal}
                  </h1>
                  <h1 className="h-20">{exp.descripcion}</h1>
                </div>
              </div>
              <div className="flex-grow flex justify-end gap-3">
                <button
                  className="Button mt-2"
                  type="button"
                  onClick={() => {
                    obtener(exp.id);
                  }}
                >
                  <a href="#formulario"></a>
                  Editar
                </button>
                <button
                  className="Button mt-2"
                  type="button"
                  onClick={() => {
                    eliminar(exp.id);
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
