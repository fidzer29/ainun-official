import { Activity, BadgeCheck, Heart, Sparkles } from "lucide-react";
import ReviewCarousel from "./ReviewCarousel";
import ScrollReveal from "./reactbits/ScrollReveal";
import SpinningLogo from "./SpinningLogo";

const benefits = [
  {
    title: "Material Nyaman",
    description: "Bahan pilihan untuk menemani aktivitas dengan nyaman.",
    Icon: Heart,
  },
  {
    title: "Desain Elegan",
    description: "Potongan simpel yang tetap anggun dan stylish.",
    Icon: Sparkles,
  },
  {
    title: "Serbaguna",
    description: "Pilihan busana untuk olahraga maupun keseharian.",
    Icon: Activity,
  },
  {
    title: "Detail Terjaga",
    description: "Perhatian pada detail bahan dan proses produksi.",
    Icon: BadgeCheck,
  },
];

export default function BrandTrustSections() {
  return (
    <>
      <section className="reviews-section" id="ulasan">
        <div className="section-heading">
          <p className="section-kicker">Cerita Mereka</p>
          <h2>Apa Kata Mereka?</h2>
          {/* <span className="reviews-circular-accent">
            <SpinningLogo />
          </span> */}
          <p>
            Kenyamanan yang ingin kami hadirkan untuk menemani aktivitasmu.
          </p>
        </div>
        <ReviewCarousel />
      </section>

      <section className="benefits-section" id="keunggulan">
        <div className="section-heading">
          <p className="section-kicker">Keunggulan Ainun</p>
          <h2>Nyaman Dipakai, Percaya Diri Setiap Hari</h2>
          <p>
            Koleksi yang dirancang untuk membuatmu leluasa bergerak tanpa
            meninggalkan gaya yang anggun.
          </p>
        </div>
        <div className="benefits-grid">
          {benefits.map(({ title, description, Icon }, index) => (
            <ScrollReveal
              as="article"
              className="benefit-card"
              delay={index * 70}
              key={title}
            >
              <span className="benefit-icon">
                <Icon aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
