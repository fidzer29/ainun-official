import "./globals.css";
import { getSiteUrl } from "../lib/site-url";

export const metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Ainun Official | Syar'i Sporty untuk Aktivitas Tanpa Batas",
    template: "%s | Ainun Official",
  },
  description:
    "Temukan koleksi pakaian olahraga syar'i Ainun Official yang nyaman untuk menemani aktivitasmu. Lihat katalog dan pesan melalui WhatsApp atau Shopee.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ainun Official | Syar'i Sporty untuk Aktivitas Tanpa Batas",
    description:
      "Koleksi pakaian olahraga syar'i yang nyaman, dengan pilihan warna hitam, army, dan terracotta.",
    type: "website",
    locale: "id_ID",
    siteName: "Ainun Official",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Koleksi fashion wanita Ainun Official",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ainun Official | Syar'i Sporty untuk Aktivitas Tanpa Batas",
    description:
      "Koleksi pakaian olahraga syar'i yang nyaman, dengan pilihan warna hitam, army, dan terracotta.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
