import Link from "next/link";

export default function Navbar() {
  return (
    <div className="border-b-[1px] border-slate-900 text-sm">
      <div className="Barra">
        <div>Logo</div>
        <div className="flex gap-3">
          <Link href={"/"}>
            <h1>Inicio</h1>
          </Link>
          <Link href={"/perfil/info-personal"}>
            <h1>Perfil</h1>
          </Link>
          <Link href={"/disenos"}>
            <h1>Diseños</h1>
          </Link>
          <Link href={"/informacion"}>
            <h1>Información</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
