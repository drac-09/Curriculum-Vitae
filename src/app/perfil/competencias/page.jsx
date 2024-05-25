"use client";
import Cookies from "js-cookie";
import { Glegoo } from "next/font/google";
import { useState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function Competencias() {
  // const habilidades = {};
  const [competencias, setCompetencias] = useState({
    habilidades: [],
    aptitudes: [],
    lenguajes: [],
  });
  const [habilidad, setHabilidad] = useState("");
  const [aptitud, setAptitud] = useState("");
  const [lenguaje, setLenguaje] = useState([]);

  useEffect(() => {
    const existe = Cookies.get("Competencias");
    if (!existe) Cookies.set("Competencias", JSON.stringify(competencias));
    if (existe) obtenerCompetenciasDesdeCookies();
  }, []);

  // Obteniendo Datos desde las Cookies
  const obtenerCompetenciasDesdeCookies = () => {
    const competenciasDesdeCookies = Cookies.get("Competencias");
    if (competenciasDesdeCookies) {
      setCompetencias(JSON.parse(competenciasDesdeCookies));
    }
  };

  function agregar(competencia) {
    const fecha = new Date();

    // Agregar Habilidad
    if (competencia === "Habilidades" && habilidad) {
      const Nueva = {
        id: fecha.getTime().toString(),
        habilidad: habilidad,
      };
      actualizarCookies("habilidades", Nueva);
      setHabilidad("");
    }

    // Agregar Aptitud
    if (competencia === "Aptitudes" && aptitud) {
      const Nueva = {
        id: fecha.getTime().toString(),
        aptitud: aptitud,
      };
      actualizarCookies("aptitudes", Nueva);
      setAptitud("");
    }

    // Agrega Languages
    if (competencia === "Lenguajes" && lenguaje) {
      const Nueva = {
        id: fecha.getTime().toString(),
        lenguaje: lenguaje,
      };
      actualizarCookies("lenguajes", Nueva);
      setLenguaje("");
    }
    obtenerCompetenciasDesdeCookies();
  }

  function eliminar(id, competencia) {
    const tmp = JSON.parse(Cookies.get("Competencias"));
    const index = tmp[competencia].findIndex((objeto) => objeto.id === id);
    if (index !== -1) {
      tmp[competencia].splice(index, 1);
      Cookies.set("Competencias", JSON.stringify(tmp));
      obtenerCompetenciasDesdeCookies();
    }
  }

  function actualizarCookies(competencia, nueva) {
    const tmp = JSON.parse(Cookies.get("Competencias"));
    tmp[competencia].push(nueva);
    Cookies.set("Competencias", JSON.stringify(tmp));
  }

  const ordenarPorLongitud = (a, b, propiedad) => {
    return a[propiedad].length - b[propiedad].length;
  };

  return (
    <div>
      <div>
        <h5 className="Titulo">Habilidades Blandas</h5>
        <hr className="Hr" />
        <p>
          Son habilidades sociales, emocionales y de comunicación que te
          permiten interactuar efectivamente con otras personas y trabajar en
          equipo. Algunos ejemplos de habilidades blandas son la capacidad de
          comunicación, la empatía, el trabajo en equipo y el liderazgo.
        </p>
      </div>
      <br />
      <form action="" className="mb-32">
        <section className="flex gap-3 md:w-full">
          <label htmlFor="habilidad" className="w-1/8">
            Habilidad:
          </label>
          <input
            type="text"
            id="habilidad"
            value={habilidad}
            onChange={(e) => setHabilidad(e.target.value)}
            className="Input flex-grow lg:text-base"
            list="habilidades"
            autoComplete="off"
          />
          <datalist
            id="habilidades"
            className="absolute left-0 w-full bg-slate-600"
          >
            <option value="Empatía.">Empatía.</option>
            <option value="Creatividad.">Creatividad.</option>
            <option value="Trabajo en equipo.">Trabajo en equipo.</option>
            <option value="Toma de decisiones.">Toma de decisiones.</option>
            <option value="Gestión del tiempo.">Gestión del tiempo.</option>
            <option value="Pensamiento crítico.">Pensamiento crítico.</option>
            <option value="Comunicación efectiva.">
              Comunicación efectiva.
            </option>
            <option value="Capacidad de liderazgo.">
              Capacidad de liderazgo.
            </option>
            <option value="Resolución de problemas.">
              Resolución de problemas.
            </option>
          </datalist>
          <button
            type="button"
            onClick={() => {
              agregar("Habilidades");
            }}
            className="Button w-1/10"
          >
            Añadir
          </button>
        </section>
        <br />
        <section>
          <div className="flex gap-3 flex-wrap">
            {competencias.habilidades
              .slice()
              .sort((a, b) => ordenarPorLongitud(a, b, "habilidad"))
              .map((habilidad) => (
                <div
                  key={habilidad.id}
                  className="Etiqueta max-w-max flex gap-3 lg:text-base"
                >
                  <h1>{habilidad.habilidad}</h1>
                  <button
                    type="button"
                    className="Border-l pl-2"
                    onClick={() => eliminar(habilidad.id, "habilidades")}
                  >
                    <IoIosCloseCircleOutline className="text-lg Alerta" />
                  </button>
                </div>
              ))}
          </div>
        </section>
      </form>

      <div>
        <h5 className="Titulo">Habilidades Técnicas</h5>
        <hr className="Hr" />
        <p>
          Son habilidades específicas y prácticas que necesitas para desempeñar
          un trabajo o tarea particular. Por ejemplo, saber programar, operar
          maquinaria, o utilizar software especializado.
        </p>
      </div>
      <br />
      <form action="" className="mb-32">
        <section className="flex gap-3 md:w-full">
          <label htmlFor="aptitud" className="w-1/8">
            Aptitud:
          </label>
          <input
            type="text"
            id="aptitud"
            value={aptitud}
            onChange={(e) => setAptitud(e.target.value)}
            className="Input flex-grow lg:text-base"
            list="aptitudes"
            autoComplete="off"
          />
          <datalist id="aptitudes">
            <option value="Microsoft Office.">Microsoft Office.</option>
            <option value="Dominio de idiomas.">Dominio de idiomas.</option>
            <option value="Atención al cliente.">Atención al cliente.</option>
            <option value="Redacción de textos.">Redacción de textos.</option>
            <option value="Gestión de proyectos.">Gestión de proyectos.</option>
            <option value="Manejo de contabilidad.">
              Manejo de contabilidad.
            </option>
            <option value="SEO y marketing digital.">
              SEO y marketing digital.
            </option>
            <option value="Configuración de servidores.">
              Configuración de servidores.
            </option>
            <option value="Manejo de maquinaria pesada.">
              Manejo de maquinaria pesada.
            </option>
            <option value="Soldadura y ensamblaje mecánico.">
              Soldadura y ensamblaje mecánico.
            </option>
            <option value="Técnicas básicas de diseño gráfico.">
              Técnicas básicas de diseño gráfico.
            </option>
          </datalist>
          <button
            type="button"
            onClick={() => {
              agregar("Aptitudes");
            }}
            className="Button w-1/10"
          >
            Añadir
          </button>
        </section>
        <br />
        <section>
          <div className="flex gap-3 flex-wrap">
            {competencias.aptitudes
              .slice()
              .sort((a, b) => ordenarPorLongitud(a, b, "aptitud"))
              .map((aptitud) => (
                <div
                  key={aptitud.id}
                  className="Etiqueta max-w-max flex gap-3 lg:text-base"
                >
                  <h1>{aptitud.aptitud}</h1>
                  <button
                    type="button"
                    className="Border-l pl-2"
                    onClick={() => eliminar(aptitud.id, "aptitudes")}
                  >
                    <IoIosCloseCircleOutline className="text-lg Alerta" />
                  </button>
                </div>
              ))}
          </div>
        </section>
      </form>

      <div>
        <h5 className="Titulo">Lenguajes</h5>
        <hr className="Hr" />
        <p>
          En esta parte, dices qué idiomas hablas. Al ingresar los lenguajes
          tendrás una lista de ejemplos.
        </p>
      </div>
      <br />
      <form action="" className="mb-32">
        <section className="flex gap-3 md:w-full">
          <label htmlFor="lenguaje" className="w-1/8">
            Lenguajes:
          </label>
          <input
            type="text"
            id="lenguaje"
            value={lenguaje}
            onChange={(e) => setLenguaje(e.target.value)}
            className="Input flex-grow lg:text-base"
            list="lenguajes"
            autoComplete="off"
          />
          <datalist id="lenguajes">
            <option value="Ruso.">Ruso.</option>
            <option value="Ingles.">Ingles.</option>
            <option value="Español.">Español.</option>
            <option value="Japones.">Japones.</option>
            <option value="Frances.">Frances.</option>
            <option value="Italiano.">Italiano.</option>
            <option value="Portugués.">Portugués.</option>
            <option value="Chino Mandarin.">Chino Mandarin.</option>
          </datalist>
          <button
            type="button"
            onClick={() => {
              agregar("Lenguajes");
            }}
            className="Button w-1/10"
          >
            Añadir
          </button>
        </section>
        <br />
        <section>
          <div className="flex gap-3 flex-wrap">
            {competencias.lenguajes
              .slice()
              .sort((a, b) => ordenarPorLongitud(a, b, "lenguaje"))
              .map((lenguaje) => (
                <div
                  key={lenguaje.id}
                  className="Etiqueta max-w-max flex gap-3 lg:text-base"
                >
                  <h1>{lenguaje.lenguaje}</h1>
                  <button
                    type="button"
                    className="Border-l pl-2"
                    onClick={() => eliminar(lenguaje.id, "lenguajes")}
                  >
                    <IoIosCloseCircleOutline className="text-lg Alerta" />
                  </button>
                </div>
              ))}
          </div>
        </section>
      </form>
    </div>
  );
}

// [
//   { id: "1707698343580", dato: "Primero" },
//   { id: "1707698349236", dato: "Segundo" },
// ];
