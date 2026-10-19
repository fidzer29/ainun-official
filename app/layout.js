import "./globals.css";
import { getSiteUrl } from "../lib/site-url";

export const metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Ainun Official | Koleksi Fashion Wanita",
    template: "%s | Ainun Official",
  },
  description:
    "Temukan koleksi fashion wanita Ainun Official. Lihat detail produk dan pesan langsung melalui WhatsApp atau Shopee.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ainun Official | Koleksi Fashion Wanita",
    description: "Temukan koleksi fashion wanita pilihan dari Ainun Official.",
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
    title: "Ainun Official | Koleksi Fashion Wanita",
    description: "Temukan koleksi fashion wanita pilihan dari Ainun Official.",
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
