import Image from "next/image";

export default function Informacion() {
  return (
    <div className="flex flex-col gap-10 p-5 md:p-0 h-[85vh] overflow-y-auto">
      <section>
        <h1 className="Alerta">Preguntas Frecuentes</h1>
        <hr className="Hr" />
      </section>
      <section className="flex gap-5 text-xs leading-5 md:text-sm">
        <Image
          src="/importante/write.svg"
          alt="descargar"
          height={0}
          width={0}
          className="w-10 md:w-[50px] h-auto"
        />
        <div className="flex-wrap">
          <h1 className="Titulo">
            ¿Es necesario llenar todos los campos o ingresar toda la información
            que se pide?
          </h1>
          <p className="text-justify text-wrap">
            No, los campos que dejes vacíos no se agregaran al curriculum vitae.
          </p>
        </div>
      </section>
      <section className="flex gap-5 text-xs leading-5 md:text-sm">
        <Image
          src="/importante/archive.svg"
          alt="descargar"
          height={0}
          width={0}
          className="w-10 md:w-[50px] h-auto"
        />
        <div>
          <h1 className="Titulo">¿Donde se guarda la información?</h1>
          <p className="text-justify text-wrap">
            La información se almacena en el navegador (Cookies y LocalStorage),
            lo que significa que incluso después de cerrar la pestaña, sus datos
            seguirán disponibles. Sin embargo, al eliminar el almacenamiento del
            navegador, también se eliminarán sus datos.
          </p>
        </div>
      </section>
      <section className="flex gap-5 text-xs leading-5 md:text-sm">
        <Image
          src="/importante/download.svg"
          alt="descargar"
          height={0}
          width={0}
          className="w-10 md:w-[50px] h-auto"
        />
        <div>
          <h1 className="Titulo">¿Puedo hacer una copia de mi informacion?</h1>
          <p className="text-justify text-wrap">
            En la pestaña de PERFIL, en el menu a la izquierda en la parte
            inferior encontraras un botón de{" "}
            <span className="border-[1px] text-[10px] md:text-xs rounded-md mx-1 px-2 py-[1px] whitespace-nowrap">
              Descargar Información
            </span>{" "}
            al pulsar dicho botón, podrás descargar tu informacion en un
            archivo.
          </p>
        </div>
      </section>
      <section className="flex gap-5 text-xs leading-5 md:text-sm">
        <Image
          src="/importante/upload.svg"
          alt="descargar"
          height={0}
          width={0}
          className="w-10 md:w-[50px] h-auto"
        />
        <div>
          <h1 className="Titulo">¿Que hacer con el archivo descargado?</h1>
          <p className="text-justify text-wrap">
            Con este archivo podrás cargar tu información para actualizarla o
            agregar mas datos. En la pestaña de PERFIL en el menu ala izquierda
            encontraras un botón de{" "}
            <span className="border-[1px] text-[10px] md:text-xs rounded-md mx-1 px-2 py-[1px] whitespace-nowrap">
              Cargar Información
            </span>{" "}
            al pulsar dicho botón este te llevara a una sección donde elegirás
            el archivo que quieras abrir y asi podrás cargar tu informacion.
          </p>
        </div>
      </section>
      <section className="flex gap-5 text-xs leading-5 md:text-sm">
        <Image
          src="/importante/delete.svg"
          alt="descargar"
          height={0}
          width={0}
          className="w-10 md:w-[50px] h-auto"
        />
        <div>
          <h1 className="Titulo">
            ¿Que hacer si quiero borrar mi informacion del navegador?
          </h1>
          <p className="text-justify text-wrap">
            En la pestaña de PERFIL en el menu ala izquierda encontraras un
            botón de{" "}
            <span className="border-[1px] text-[10px] md:text-xs rounded-md md:mx-1 px-2 py-[1px] whitespace-nowrap">
              Borrar Información
            </span>{" "}
            al pulsar el botón este abrirá una ventana de confirmación, una vez
            le des aceptar tu informacion sera borrada permanentemente.
          </p>
        </div>
      </section>
    </div>
  );
}
