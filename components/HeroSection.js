import { ArrowRight, Heart, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";
import SplitFlapText from "./reactbits/SplitFlapText";
import TextType from "./reactbits/TextType";
import ImageReveal from "./reactbits/ImageReveal";
import TiltedCard from "./reactbits/TiltedCard";

export default function HeroSection() {
  return (
    <section className="hero" id="beranda">
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">
            <TextType
              text={["Koleksi Terbaru", "Pilihan Favorit", "Ainun Official"]}
              typingSpeed={90}
              pauseDuration={3000}
              deletingSpeed={42}
              startOnVisible
              aria-hidden="true"
            />
            <span className="visually-hidden">Koleksi Terbaru</span>
          </span>
          <h1>
            Syar&apos;i Sporty{" "}
            <span className="hero-headline-keyword">
              <SplitFlapText text="Aktivitas" />
              <span className="visually-hidden">Aktivitas</span>
            </span>
            <span className="hero-headline-tail">Tanpa Batas</span>
          </h1>
          <p className="hero-description">
            Kami menghadirkan koleksi pakaian olahraga yang nyaman dengan style
            syar&apos;i.
          </p>
          <div className="hero-promises">
            <div className="hero-promise">
              <span className="promise-icon">
                <Heart aria-hidden="true" />
              </span>
              <span>Bahan adem<br />dan nyaman</span>
            </div>
            <div className="hero-promise">
              <span className="promise-icon">
                <Sparkles aria-hidden="true" />
              </span>
              <span>Produk lokal</span>
            </div>
            <div className="hero-promise">
              <span className="promise-icon">
                <Leaf aria-hidden="true" />
              </span>
              <span>Bebas<br />beraktivitas</span>
            </div>
          </div>
          <a className="button-dark" href="#katalog">
            Lihat Katalog
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div
          className="hero-art"
          role="img"
          aria-label="Model mengenakan Afiyah Set warna hitam, army, dan terracotta"
        >
          <TiltedCard className="hero-art-tilt">
            <ImageReveal className="hero-art-image-reveal">
              <Image
                className="hero-art-photo"
                src="/images/afiyah_set/afiyah.JPG"
                alt=""
                fill
                priority
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </ImageReveal>
          </TiltedCard>
          <span className="hero-art-label">@ainunofficial</span>
        </div>
      </div>
    </section>
  );
}
