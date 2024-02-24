import Image from "next/image";
import Link from "next/link";
import { Courgette } from "next/font/google";

const titulo = Courgette({
  subsets: ["latin"],
  weight: "400",
});

export default function inicio() {
  return (
    <main>
      <div className="flex h-[80vh] items-center">
        <div className="flex flex-col gap-10">
          <section className="flex flex-col justify-center items-center">
            <h1
              className={`${titulo.className} antialiased text-5xl font-bold`}
            >
              Curriculum Vitae
            </h1>
            <br />
            <p>
              Bienvenido a{" "}
              <span className={`${titulo.className} antialiased`}>
                Curriculum Vitae
              </span>
              , donde tu próximo CV profesional está a solo unos clics de
              distancia.
            </p>
            <br />
            <p className=" flex-wrap text-center">
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
            <div className="flex justify-between gap-3">
              <Image
                src="/home/cv1.jpg"
                alt="home1"
                width={250}
                height={631}
                className="rounded-md w-auto h-auto"
              ></Image>
              <Image
                src="/home/cv2.jpg"
                alt="home1"
                width={250}
                height={631}
                className="rounded-md w-auto h-auto"
              ></Image>
              <Image
                src="/home/cv3.jpg"
                alt="home1"
                width={250}
                height={631}
                className="rounded-md w-auto h-auto"
              ></Image>
            </div>
            <br />
            <div className="flex flex-col items-center gap-3">
              <p className="Alerta text-xl font-bold">
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
