import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function LinkDisenios({ dato }) {
  const pathName = usePathname();

  return (
    <Link
      href={`/disenios/${dato}`}
      className={`${pathName === `/disenios/${dato}` ? "Seleccionado" : ""}`}
    >
      <Image
        src={`/cv/${dato}.jpg`}
        alt="cv"
        width={120}
        height={60}
        className="w-auto h-auto md:ml-[22px]"
        priority
      />
    </Link>
  );
}
