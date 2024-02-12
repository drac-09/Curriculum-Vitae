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
  const [habilidades, setHabilidades] = useState([]);
  const [habilidad, setHabilidad] = useState("");
  const [aptitudes, setAptitudes] = useState([]);
  const [aptitud, setAptitud] = useState("");
  const [lenguajes, setLenguajes] = useState([]);
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
      habilidades.push(Nueva);
      setHabilidad("");
    }

    // Agregar Aptitud
    if (competencia === "Aptitudes" && aptitud) {
      const Nueva = {
        id: fecha.getTime().toString(),
        aptitud: aptitud,
      };
      aptitudes.push(Nueva);
      setAptitud("");
    }

    // Agrega Languages
    if (competencia === "Lenguajes" && lenguaje) {
      const Nueva = {
        id: fecha.getTime().toString(),
        lenguaje: lenguaje,
      };
      lenguajes.push(Nueva);
      setLenguaje("");
    }

    actualizarCookies();
    obtenerCompetenciasDesdeCookies();
  }

  function eliminar(id, competencia) {
    const index = competencia.findIndex((objeto) => objeto.id === id);
    if (index !== -1) {
      competencia.splice(index, 1);
      actualizarCookies();
      obtenerCompetenciasDesdeCookies();
    }
  }

  function actualizarCookies() {
    const competencias = {
      habilidades: habilidades,
      aptitudes: aptitudes,
      lenguajes: lenguajes,
    };
    Cookies.set("Competencias", JSON.stringify(competencias));
  }

  const ordenarPorLongitud = (a, b, propiedad) => {
    return a[propiedad].length - b[propiedad].length;
  };

  return (
    <div>
      <div>
        <h5 className="Titulo">Habilidades</h5>
        <hr className="Hr" />
        <p className="text-sm text-gray-200">
          Aquí mencionas las cosas que sabes hacer bien. Pueden ser cosas como
          usar computadoras, hablar en público, o trabajar en equipo. Por
          ejemplo, si eres bueno con Excel o sabes programar en Python, es
          importante mencionarlo aquí.
        </p>
      </div>
      <br />
      <form action="">
        <section className="flex gap-3 md:w-full">
          <label htmlFor="habilidad" className="w-1/8">
            Habilidad:
          </label>
          <input
            type="text"
            id="habilidad"
            value={habilidad}
            onChange={(e) => setHabilidad(e.target.value)}
            className="Input flex-grow"
          />
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
                  className="Etiqueta max-w-max flex gap-3"
                >
                  <h1>{habilidad.habilidad}</h1>
                  <button
                    type="button"
                    className="Border-l pl-2"
                    onClick={() => eliminar(habilidad.id, habilidades)}
                  >
                    <IoIosCloseCircleOutline className="text-lg Alerta" />
                  </button>
                </div>
              ))}
          </div>
        </section>
      </form>
      <br />
      <br />
      <br />

      <div>
        <h5 className="Titulo">Aptitudes</h5>
        <hr className="Hr" />
        <p className="text-sm text-gray-200">
          Son las cosas que se te dan naturalmente o que has aprendido a hacer
          muy bien. Por ejemplo, si eres muy bueno para resolver problemas
          complicados o tienes mucha paciencia para tratar con personas
          difíciles, es bueno mencionarlo aquí.
        </p>
      </div>
      <br />
      <form action="">
        <section className="flex gap-3 md:w-full">
          <label htmlFor="aptitud" className="w-1/8">
            Aptitud:
          </label>
          <input
            type="text"
            id="aptitud"
            value={aptitud}
            onChange={(e) => setAptitud(e.target.value)}
            className="Input flex-grow"
          />
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
                <div key={aptitud.id} className="Etiqueta max-w-max flex gap-3">
                  <h1>{aptitud.aptitud}</h1>
                  <button
                    type="button"
                    className="Border-l pl-2"
                    onClick={() => eliminar(aptitud.id, aptitudes)}
                  >
                    <IoIosCloseCircleOutline className="text-lg Alerta" />
                  </button>
                </div>
              ))}
          </div>
        </section>
      </form>
      <br />
      <br />
      <br />

      <div>
        <h5 className="Titulo">Lenguajes</h5>
        <hr className="Hr" />
        <p className="text-sm text-gray-200">
          En esta parte, dices qué idiomas hablas y qué tan bien los hablas. Si
          hablas inglés, puedes decir si lo hablas básico, intermedio o
          avanzado. Por ejemplo, si has vivido en Estados Unidos y puedes
          conversar fácilmente con personas en inglés, es importante mencionarlo
          aquí.
        </p>
      </div>
      <br />
      <form action="">
        <section className="flex gap-3 md:w-full">
          <label htmlFor="lenguaje" className="w-1/8">
            Lenguajes:
          </label>
          <input
            type="text"
            id="lenguaje"
            value={lenguaje}
            onChange={(e) => setLenguaje(e.target.value)}
            className="Input flex-grow"
          />
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
                  className="Etiqueta max-w-max flex gap-3"
                >
                  <h1>{lenguaje.lenguaje}</h1>
                  <button
                    type="button"
                    className="Border-l pl-2"
                    onClick={() => eliminar(lenguaje.id, lenguajes)}
                  >
                    <IoIosCloseCircleOutline className="text-lg Alerta" />
                  </button>
                </div>
              ))}
          </div>
        </section>
      </form>
      <br />
    </div>
  );
}

// [
//   { id: "1707698343580", dato: "Primero" },
//   { id: "1707698349236", dato: "Segundo" },
// ];
