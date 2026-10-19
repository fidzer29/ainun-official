"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import Brand from "./Brand";

const links = [
  { label: "Beranda", href: "/#beranda" },
  { label: "Katalog", href: "/#katalog" },
  { label: "Ulasan", href: "/#ulasan" },
  { label: "Keunggulan", href: "/#keunggulan" },
  { label: "Tentang Kami", href: "/#tentang" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Navigasi utama">
        <Link href="/#beranda" aria-label="Ainun Official, ke beranda">
          <Brand />
        </Link>
        <div className="nav-links">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          className="contact-pill"
          href="/#kontak"
        >
          <MessageCircle aria-hidden="true" />
          Hubungi Kami
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      {menuOpen ? (
        <div className="nav-mobile-links" id="mobile-navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
