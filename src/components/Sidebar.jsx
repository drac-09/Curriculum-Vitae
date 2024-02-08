import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-[85vh] border-r-[1px] border-slate-900 pr-10">
      <div className="flex flex-col gap-3 flex-grow text-sm">
        <div className="border-b-[1px] border-slate-900 pb-5 mb-5">
          <Image
            src="/user.svg"
            width={150}
            height={150}
            alt="user"
            priority={true}
          />
          <h1 className="text-center">Seleccionar Foto...</h1>
        </div>
        <Link href={"/perfil/info-personal"}>
          <h1>Información Personal</h1>
        </Link>
        <Link href={"/perfil/info-academica"}>
          <h1>Información Académica</h1>
        </Link>
        <Link href={"/perfil/experiencia-laboral"}>
          <h1>Experiencia Laboral</h1>
        </Link>
        <Link href={"/perfil/competencias"}>
          <h1>Competencias</h1>
        </Link>
        <Link href={"/perfil/ref-personales"}>
          <h1>Referencias Personales</h1>
        </Link>
      </div>
      <button className="border-[1px] border-white py-1 px-4 rounded-xl text-sm mr-auto">
        Borrar Información
      </button>
    </div>
  );
}
