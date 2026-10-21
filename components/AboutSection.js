import { Heart, Leaf, Sparkles } from "lucide-react";
import Link from "next/link";
import TrueFocus from "./reactbits/TrueFocus";
import ScrollReveal from "./reactbits/ScrollReveal";

export default function AboutSection() {
  return (
    <section className="about-section" id="tentang">
      <div className="about-inner">
        <ScrollReveal className="about-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.417602788162!2d107.5506607!3d-6.9599655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68efe6b41b5ea1%3A0x357d7c3213afa935!2sAinun%20Collections%20Busana%20Syar'i%20Olahraga%20dan%20Outdoor!5e0!3m2!1sen!2sid!4v1792571605407!5m2!1sen!2sid"
            title="Lokasi Ainun Official di Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </ScrollReveal>
        <ScrollReveal className="about-copy" delay={120}>
          <p className="section-kicker">Tentang Kami</p>
          <h2 className="about-heading">
            <span className="about-heading-focus">
              <TrueFocus sentence="Gaya Anggun" />
              <span className="visually-hidden">Gaya Anggun</span>
            </span>
            <span>Untuk Setiap Momen.</span>
          </h2>
          <p>
            Ainun Official menghadirkan koleksi fashion wanita yang
            mengutamakan tampilan elegan dan kenyamanan. Temukan pilihan busana
            yang dapat menemani berbagai aktivitas dan momen spesialmu.
          </p>
          <p>
            Jelajahi koleksi kami dan temukan gaya yang paling sesuai dengan
            karakter serta kebutuhanmu.
          </p>
          <ul className="about-values" aria-label="Nilai koleksi">
            <li>
              <Heart aria-hidden="true" />
              Nyaman dikenakan
            </li>
            <li>
              <Sparkles aria-hidden="true" />
              Anggun dan versatile
            </li>
            <li>
              <Leaf aria-hidden="true" />
              Pilihan untuk keseharian
            </li>
          </ul>
          <Link href="/#katalog" className="about-button">
            Lihat Koleksi Kami
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
