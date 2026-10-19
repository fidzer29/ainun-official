import Image from "next/image";

export default function Brand({ footer = false }) {
  return (
    <span className="brand" aria-label="Ainun Official Store">
      <span className="brand-mark" aria-hidden="true">
        <Image
          src="/images/logo-ainun-biasa.png"
          alt=""
          width={455}
          height={640}
          sizes="44px"
        />
      </span>
      {footer ? <span className="sr-only">Official Store</span> : null}
    </span>
  );
}
