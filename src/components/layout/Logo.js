import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="CivicBD, home">
      <Image
        src="/logo-horizontal.png"
        alt="CivicBD"
        width={1179}
        height={377}
        className="logo__img"
        priority
      />
    </Link>
  );
}
