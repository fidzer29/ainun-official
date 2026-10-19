import Link from "next/link";
import Brand from "./Brand";
import {
  INSTAGRAM_URL,
  SHOPEE_URL,
  TIKTOK_URL,
  getWhatsAppUrl,
} from "../lib/contact-links";
import { ShopeeIcon, WhatsAppIcon } from "./OrderPlatformIcons";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-4.2-4.74V1h-3.56v13.67a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6.05.88.14v-3.7a6.5 6.5 0 1 0 5.58 6.43V8.99a8.3 8.3 0 0 0 4.86 1.56V7a4.8 4.8 0 0 1-.66-.31z" />
    </svg>
  );
}

const contactLinks = [
  { label: "WhatsApp", href: getWhatsAppUrl(), Icon: WhatsAppIcon },
  { label: "Instagram", href: INSTAGRAM_URL, Icon: InstagramIcon },
  { label: "TikTok", href: TIKTOK_URL, Icon: TikTokIcon },
  { label: "Shopee", href: SHOPEE_URL, Icon: ShopeeIcon },
];

export default function Footer() {
  return (
    <footer className="footer-section" id="kontak">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand-column">
            <Link href="/#beranda" aria-label="Ainun Official, ke beranda">
              <Brand footer />
            </Link>
            <p>
              Temukan koleksi fashion wanita pilihan untuk melengkapi gaya
              anggun dan keseharianmu.
            </p>
          </div>

          <nav className="footer-column" aria-label="Navigasi footer">
            <h2>Navigasi</h2>
            <Link href="/#beranda">Beranda</Link>
            <Link href="/#katalog">Koleksi</Link>
            <Link href="/#ulasan">Ulasan</Link>
            <Link href="/#keunggulan">Keunggulan</Link>
            <Link href="/#tentang">Tentang Kami</Link>
          </nav>

          <div className="footer-column">
            <h2>Temukan Kami</h2>
            {contactLinks.map(({ label, href, Icon }) => (
              <a
                href={href}
                key={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© Ainun Official. Hak cipta dilindungi.</p>
          <Link href="/#katalog">Lihat koleksi</Link>
        </div>
      </div>
    </footer>
  );
}
