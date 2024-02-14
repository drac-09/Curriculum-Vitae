"use client";
import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
// import "./Demo.css";

const defaultSrc = "/imagen.jpg";

export default function Page() {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
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
    }
  };

  return (
    <div>
      <input
        type="file"
        className="text-white border-red-700"
        onChange={onChange}
      />
      <br />
      <br />
      <div className="flex flex-col md:flex-row gap-10 w-full">
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
        <div className="flex flex-col justify-start items-center p-[10px] box-border w-1/2 float-right">
          <h1>Preview</h1>
          <br />
          <div className="overflow-hidden h-[170px] w-[200px] rounded-[50%]" />
        </div>
      </div>

      {/* <div
          className="inline-block p-[10px] box-border"
          id="ImagenRecortada"
          style={{ width: "50%", float: "right", height: "300px" }}
        >
          <h1>
            <span>Crop</span>
            <button
              className="Button"
              style={{ float: "right" }}
              onClick={getCropData}
            >
              Crop Image
            </button>
          </h1>
          <img style={{ width: "100%" }} src={cropData} alt="cropped" />
        </div> */}
      <br style={{ clear: "both" }} />
    </div>
  );
}
