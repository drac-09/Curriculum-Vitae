import Image from "next/image";
import Link from "next/link";
import { Courgette } from "next/font/google";

const titulo = Courgette({
  subsets: ["latin"],
  weight: "400",
});

export default function inicio() {
  return (
    <main className="p-5 md:p-0">
      <div className="flex h-max lg:h-[80vh] lg:items-center">
        <div className="flex flex-col gap-5 lg:gap-10">
          <section className="flex flex-col justify-center items-center md:text-base">
            {/* <h1
              className={`${titulo.className} antialiased text-3xl md:text-5xl font-bold lg:hidden`}
            >
              Curriculum Vitae
            </h1>
            <br /> */}
            <p>
              Bienvenido a{" "}
              <span className={`${titulo.className} antialiased`}>
                Curriculum Vitae
              </span>
              , donde tu próximo CV profesional está a solo unos clics de
              distancia.
            </p>
            <br />
            <p className="text-justify md:text-center">
              Antes que nada, te invitamos a revisar nuestra pestaña de{" "}
              <Link href={"/importante"} className="Alerta font-semibold">
                IMPORTANTE
              </Link>
              , donde encontrarás información relevante sobre el respaldo de tus
              datos y otros aspectos importantes. Es fundamental para una
              experiencia completa y segura en nuestra plataforma.
            </p>
          </section>
          <section className="flex flex-col gap-3">
            <div className="flex flex-col items-center md:flex-row md:justify-center gap-3 w-auto h-auto">
              <Image
                src="/home/cv1.jpg"
                alt="home1"
                width={250}
                height={0}
                className="rounded-md w-full h-auto "
              ></Image>
              <Image
                src="/home/cv2.jpg"
                alt="home1"
                width={250}
                height={0}
                className="rounded-md w-full h-auto hidden lg:block"
              ></Image>
              <Image
                src="/home/cv3.jpg"
                alt="home1"
                width={250}
                height={0}
                className="rounded-md w-full h-auto hidden md:block"
              ></Image>
            </div>
          </section>
          <section>
            <div className="flex flex-col items-center gap-3">
              <p className="Alerta md:text-xl font-bold">
                ¿Listo para destacarte en el mercado laboral?
              </p>
              <Link href={"/perfil/info-personal"}>
                <button className="Button text-sm mx-auto">INICIAR</button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
