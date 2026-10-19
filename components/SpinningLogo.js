import Image from "next/image";

export default function SpinningLogo() {
  return (
    <div className="brand-logo-spinner">
      <Image
        src="/images/logo-ainun.png"
        alt="Logo Ainun Official"
        width={500}
        height={500}
      />
    </div>
  );
}
