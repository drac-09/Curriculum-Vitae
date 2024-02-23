"use client";
import { useEffect, useState } from "react";
import { Cropper } from "react-cropper";
import Image from "next/image";
import "cropperjs/dist/cropper.css";
import fotoPerfil from "../../public/imagen.jpg";

const defaultSrc = "/imagen.jpg";

export default function FotoPerfil() {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();

  useEffect(() => {
    const fotoPerfil = localStorage.getItem("fotoPerfil");
    if (fotoPerfil) {
      setCropData(fotoPerfil);
    }
  });

  const onChange = (e) => {
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
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      localStorage.setItem(
        "fotoPerfil",
        cropper.getCroppedCanvas().toDataURL()
      );
      setModal(!modal);
    }
  };

  const openmodal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center border-b-[1px] border-slate-900 pb-5 mb-5 h-72 md:h-auto">
        {/* <PiUserCircleThin className="w-[150px] text-[150px] bg-red-300" /> */}
        <div className="w-[200px] md:w-[150px] rounded-[50%]">
          {cropData === "#" ? (
            <Image
              src={fotoPerfil}
              alt="fotoPerfil"
              width={400}
              height={400}
              className="rounded-[50%]"
            ></Image>
          ) : (
            <Image
              src={cropData}
              alt="fotoPerfil"
              width={400}
              height={400}
              className="rounded-[50%]"
            ></Image>
          )}
          <br />
          <br />
        </div>
        <button className="Button" onClick={openmodal}>
          Seleccionar Foto...
        </button>
      </div>

      {modal && (
        <div className="fixed z-40 md:absolute md:z-50 top-0 left-0 h-screen w-screen flex justify-center items-center bg-red-600 bg-opacity-0 text-white">
          <div className=" CardModal flex flex-col gap-5 w-screen h-screen md:w-[800px] md:h-[460px] bg-gray-950 rounded-xl p-5">
            <div className="flex flex-col gap-3 md:flex-row flex-grow w-full h-full">
              <section className="w-full h-full">
                <div>
                  <input
                    type="file"
                    className="text-white border-red-700"
                    onChange={onChange}
                  />
                  <br />
                  <br />
                  <div className="flex flex-col md:flex-row gap-10 w-full">
                    <div className="Etiqueta">
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
                    </div>
                    <div className="Etiqueta flex flex-col justify-start items-center p-[10px] box-border w-1/2 float-right">
                      <h1>Preview</h1>
                      <br />
                      <div className="overflow-hidden h-[170px] w-[200px] rounded-[50%]" />
                    </div>
                  </div>
                  <br style={{ clear: "both" }} />
                </div>
              </section>
            </div>

            <div className="flex gap-3 justify-end">
              <button type="button" className="Button" onClick={getCropData}>
                Aceptar
              </button>
              <button type="button" className="Button" onClick={openmodal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
