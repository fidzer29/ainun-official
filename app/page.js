import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ProductCatalog from "../components/ProductCatalog";
import BrandIdentitySection from "../components/BrandIdentitySection";
import BrandTrustSections from "../components/BrandTrustSections";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import { ArrowRight } from "lucide-react";
import Magnet from "../components/reactbits/Magnet";
import SpotlightCard from "../components/reactbits/SpotlightCard";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProductCatalog />
        <BrandIdentitySection />
        <BrandTrustSections />
        <AboutSection />
        <section className="closing-cta" aria-labelledby="closing-cta-title">
          <SpotlightCard className="closing-cta-inner">
            <p className="section-kicker">Ainun Official</p>
            <h2 id="closing-cta-title">Temukan Gaya Nyamanmu Bersama Ainun</h2>
            <p>
              Temukan koleksi fashion yang nyaman, elegan, dan siap menemani
              setiap aktivitasmu.
            </p>
            <Magnet>
              <a className="closing-cta-button" href="#katalog">
                Lihat Koleksi
                <ArrowRight aria-hidden="true" />
              </a>
            </Magnet>
          </SpotlightCard>
        </section>
      </main>
      <Footer />
    </>
  );
}
