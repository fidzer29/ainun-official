import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatPrice, products, sizeColumns } from "../../../data/products";
import { getWhatsAppUrl, SHOPEE_URL } from "../../../lib/contact-links";
import {
  ShopeeIcon,
  WhatsAppIcon,
} from "../../../components/OrderPlatformIcons";
import { getSiteUrl } from "../../../lib/site-url";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ProductVisual from "../../../components/ProductVisual";

function ProductPrice({ product }) {
  if (!product.prices) {
    return <p className="detail-page-price">{formatPrice(product.price)}</p>;
  }

  return (
    <dl className="detail-page-prices">
      {product.prices.map((price) => (
        <div key={price.label}>
          <dt>{price.label}</dt>
          <dd>{formatPrice(price.value)}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProductSizeChart({ product }) {
  return (
    <div className="detail-page-size-chart">
      <h2>Panduan ukuran</h2>
      <div className="detail-table-scroll">
        <table>
          <thead>
            <tr>
              {sizeColumns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {product.sizes.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th key={index} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={index}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="detail-table-note">
        LD: lingkar dada · PB: panjang baju · PC: panjang celana · LP: lingkar
        pinggang · BB: berat badan
      </p>
    </div>
  );
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan",
      robots: { index: false, follow: false },
    };
  }

  const productUrl = new URL(`/produk/${product.slug}`, getSiteUrl()).href;

  return {
    title: product.name,
    description: product.seoDescription,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.name} | Ainun Official`,
      description: product.seoDescription,
      url: productUrl,
      siteName: "Ainun Official",
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: product.coverImage,
          alt: `${product.name} - ${product.coverImageAlt}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Ainun Official`,
      description: product.seoDescription,
      images: [product.coverImage],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const message = `Halo Ainun Official, saya ingin bertanya dan memesan ${product.name}.`;

  return (
    <>
      <Navbar />
      <main className="product-detail-page">
        <div className="product-detail-page-inner">
          <Link className="product-detail-back" href="/#katalog">
            <ArrowLeft aria-hidden="true" />
            Kembali ke katalog
          </Link>
          <article className="product-detail-page-card">
            <ProductVisual product={product} />
            <div className="product-detail-page-copy">
              <p className="section-kicker">Koleksi Ainun Official</p>
              <h1>{product.name}</h1>
              <ProductPrice product={product} />
              <section>
                <h2>Detail produk</h2>
                <ul>
                  {product.description.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </section>
              <section className="product-detail-page-colors">
                <h2>Pilihan warna</h2>
                <div className="detail-color-list">
                  {product.colors.map((color, index) => (
                    <span className="detail-color" key={`${color.name}-${index}`}>
                      <span
                        className="color-dot"
                        style={{ backgroundColor: color.hex }}
                        aria-hidden="true"
                      />
                      {color.name}
                    </span>
                  ))}
                </div>
              </section>
              <ProductSizeChart product={product} />
              <div className="detail-order-actions">
                <a
                  className="order-button order-button--whatsapp"
                  href={getWhatsAppUrl(message)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon />
                  Pesan via WhatsApp
                </a>
                <a
                  className="order-button order-button--shopee"
                  href={SHOPEE_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ShopeeIcon />
                  Lihat toko di Shopee
                </a>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
