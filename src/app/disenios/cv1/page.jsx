"use client";
import DatosPersonales from "@/components/informacion/DatosPersonales";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
});

export default function Page() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const existe = Cookies.get("InformacionPersonal");
    if (existe) setDatos(JSON.parse(existe));
  }, []);

  return (
    <div className="flex flex-col mt-10 md:mt-0">
      <div className={`${roboto.className} antialiased text-xs font-semibold`}>
        <div
          id="documento"
          className="flex flex-col w-[350px] h-[453px] md:w-[541px] md:h-[700px] p-5 bg-white text-black"
        >
          <section>Foto</section>
          <section className="flex">
            <section className="w-1/2">Izquierda</section>
            <section className="w-1/2">derecha</section>
          </section>
          {/* <DatosPersonales /> */}
        </div>
        <br />
        <button className="Button mr-auto">Descargar</button>
      </div>
    </div>
  );
}
