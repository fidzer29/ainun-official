import Image from "next/image";

export default function BrandIdentitySection() {
  return (
    <section className="brand-identity-section" aria-labelledby="brand-identity-title">
      <div className="brand-identity-inner">
        <div className="brand-identity-copy">
          <p className="brand-identity-kicker">
            <span />
            Tentang Logo Kami
            <span />
          </p>
          <h2 id="brand-identity-title">
            Lebih dari Sekadar Logo, Inilah Identitas Ainun Official
          </h2>
          <p className="brand-identity-description">
            Logo Ainun Official hadir dengan simbol kaligrafi yang terinspirasi
            dari nilai-nilai Islam, melambangkan kesucian, ketulusan, dan
            kekuatan dalam setiap langkah. Setiap garisnya merepresentasikan
            perjalanan perempuan yang aktif, anggun, dan tetap berpegang pada
            nilai-nilai kebaikan.
          </p>
        </div>
        <div className="brand-identity-mark">
          <Image
            src="/images/logo-ainun-biasa.png"
            alt="Logo Ainun Official"
            width={455}
            height={640}
            sizes="(max-width: 760px) 180px, 270px"
          />
        </div>
      </div>
    </section>
  );
}
