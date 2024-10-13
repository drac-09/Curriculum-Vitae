"use client";
import { useEffect, useState, useRef } from "react";
import { Cropper } from "react-cropper";
import Image from "next/image";
import "cropperjs/dist/cropper.css";
import { GoTrash } from "react-icons/go";
import fotoPerfil from "../../public/user.svg";

const defaultSrc = "/imagen.jpg";

export default function FotoPerfil() {
  const [modal, setModal] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [btnAceptar, setBtnAceptar] = useState(false);
  const [btnEliminar, setBtnEliminar] = useState(false);

  const [mensajeError, setMensajeError] = useState(false);
  const [animacion, setAnimacion] = useState();

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("Selecciona un archivo");

  const [fotoRedonda, setFotoRedonda] = useState(false); // Estado del toggle

  useEffect(() => {
    const estado = localStorage.getItem("fotoRedonda") === "true";
    if (estado) {
      setFotoRedonda(estado);
    }
  }, []);

  useEffect(() => {
    const fotoPerfil = localStorage.getItem("fotoPerfil");
    if (fotoPerfil) {
      setCropData(fotoPerfil);
      setBtnEliminar(true);
    }
    localStorage.setItem("fotoRedonda", fotoRedonda);
  });

  // Guardar el estado del toggle en LocalStorage cada vez que cambie
  const handleToggle = () => {
    const nuevoEstado = !fotoRedonda;
    setFotoRedonda(nuevoEstado);
    localStorage.setItem("fotoRedonda", nuevoEstado);
  };

  const onChange = (e) => {
    setBtnAceptar(false);
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setFileName(files[0].name);

    if (files[0].size <= 1000000) {
      setBtnAceptar(true);
    }
  };

  const getCropData = () => {
    if (fileName !== "Selecciona un archivo") {
      if (typeof cropper !== "undefined") {
        setCropData(cropper.getCroppedCanvas().toDataURL());
        try {
          localStorage.setItem(
            "fotoPerfil",
            cropper.getCroppedCanvas().toDataURL()
          );
          setModal(!modal);
        } catch (error) {
          setMensajeError(true);
          setAnimacion("animate-fade");
          // setTimeout(() => {
          //   setAnimacion("animate-fade animate-reverse animate-delay-[8s]");
          // }, 9000);
          // setTimeout(() => {
          //   setMensajeError(false);
          // }, 10000);
        }
      }
    }
  };

  const handleClick = () => {
    setMensajeError(false);
    fileInputRef.current.click();
  };

  const openmodal = () => {
    setModal(!modal);
    setBtnAceptar(false);
  };

  const eliminarFoto = () => {
    localStorage.removeItem("fotoPerfil");
    setModalEliminar(!modalEliminar);
    setCropData(fotoPerfil);
    setBtnEliminar(false);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center md:border-b-[1px] border-slate-500 pb-5 mb-5 h-72 md:h-auto">
        {/* <PiUserCircleThin className="w-[150px] text-[150px] bg-red-300" /> */}
        <div className="w-[200px] md:w-[150px] rounded-[50%]">
          {cropData === "#" ? (
            <Image
              src={fotoPerfil}
              alt="fotoPerfil"
              width={400}
              height={400}
              className={fotoRedonda ? "rounded-[50%]" : ""}
            ></Image>
          ) : (
            <Image
              src={cropData}
              alt="fotoPerfil"
              width={400}
              height={400}
              className={fotoRedonda ? "rounded-[50%]" : ""}
            ></Image>
          )}
          <br />
          <br />
        </div>
        <section>
          <div className="flex gap-2">
            <button className="Button" onClick={openmodal}>
              Seleccionar Foto...
            </button>
            {btnEliminar && (
              <button
                className="flex items-center w-[18px]"
                onClick={() => {
                  setModalEliminar(!modalEliminar);
                }}
              >
                {" "}
                <GoTrash className="w-full h-full" />
              </button>
            )}
          </div>
          {btnEliminar && (
            <div className="flex items-center p-2 w-full justify-between">
              <h1>Imagen Circular</h1>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="toggle"
                    checked={fotoRedonda}
                    onChange={handleToggle} // Cambia el estado
                    className="hidden" // Oculta el checkbox
                  />
                  <div
                    className={`block bg-gray-300 w-8 h-4 rounded-full ${
                      fotoRedonda ? "bg-green-500" : ""
                    }`}
                  ></div>
                  <div
                    className={`absolute left-0 top-0 bg-white w-4 h-4 rounded-full transition-transform ${
                      fotoRedonda ? "translate-x-full" : ""
                    }`}
                  ></div>
                </div>
              </label>
            </div>
          )}
        </section>
      </div>

      {modal && (
        <div className="fixed z-40 md:absolute md:z-50 top-0 left-0 h-screen w-screen flex justify-center items-center bg-red-600 bg-opacity-0 text-white">
          <div className=" CardModal flex flex-col gap-5 w-screen h-screen md:w-[800px] md:h-[460px] bg-gray-950 rounded-xl p-5">
            <div className="flex flex-col gap-3 md:flex-row flex-grow w-full h-full">
              <section className="w-full h-full">
                <div className="flex flex-col justify-center md:flex-row gap-3 lg:gap-10 w-full h-full">
                  <div id="cropper" className="Etiqueta">
                    <Cropper
                      src={image}
                      style={{ height: 300, width: "100%" }}
                      initialAspectRatio={1}
                      viewMode={1}
                      dragMode="move"
                      cropBoxMovable={false}
                      cropBoxResizable={false}
                      preview=".overflow-hidden"
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false}
                      onInitialized={(instance) => {
                        setCropper(instance);
                      }}
                      guides={true}
                    />
                    <br />
                    <input
                      type="file"
                      className="text-white border-red-700 hidden"
                      ref={fileInputRef}
                      onChange={onChange}
                    />
                    {/* Botón personalizado */}
                    <div className="flex items-center text-sm max-w-max">
                      <button
                        onClick={handleClick}
                        type="button"
                        className="border-[1px] rounded-none text-xs md:text-sm py-1 px-2 bg-slate-900 w-[120px] md:w-[150px]"
                      >
                        Seleccionar Archivo
                      </button>
                      <p className="border-[1px] border-l-0 px-3 py-1 text-xs md:text-sm w-[180px] md:w-[320px] truncate">
                        {fileName}
                      </p>
                    </div>
                  </div>
                  <div
                    id="vista-previa"
                    className="Etiqueta flex flex-grow flex-col justify-between items-center p-[10px] box-border w-full md:w-1/3 float-right"
                  >
                    <div className="flex flex-col items-center">
                      <h1 className="font-bold">Vista previa</h1>
                      <br />
                      <div className="overflow-hidden w-[140px] h-[140px] lg:w-[200px] lg:h-[200px] rounded-[50%]" />
                      <h1 className="text-xs text-center mt-5">
                        Tamaño Maximo de la imagen:{" "}
                        <br className="hidden lg:block" /> 1MB = 1000Kb
                      </h1>
                    </div>
                    {mensajeError && (
                      <h1
                        className={`Alerta ${animacion} font-semibold text-center`}
                      >
                        Error, no se puede procesar. <br />
                        Por favor, seleccione otra imagen.
                      </h1>
                    )}
                  </div>
                </div>
                {/* <br style={{ clear: "both" }} /> */}
              </section>
            </div>

            <div className="flex gap-3 justify-end">
              {btnAceptar && (
                <button type="button" className="Button" onClick={getCropData}>
                  Aceptar
                </button>
              )}
              <button type="button" className="Button" onClick={openmodal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalEliminar && (
        <div className="fixed z-40 md:absolute md:z-50 top-0 left-0 h-screen w-screen flex justify-center items-center bg-red-600 bg-opacity-0 text-white">
          <div className="CardModal md:w-max md:h-max py-20 md:p-20 mx-5 bg-black">
            <h1 className="text-red-500 text-center text-xl font-bold">
              Deseas eliminar la Foto permanentemente!!!
            </h1>
            <br />
            <div className="flex gap-3 justify-center items-center">
              <button type="button" className="Button" onClick={eliminarFoto}>
                Aceptar
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalEliminar(false);
                }}
                className="Button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
