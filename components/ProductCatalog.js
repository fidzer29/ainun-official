import Link from "next/link";
import { formatPrice, products, sizeColumns } from "../data/products";
import { getWhatsAppUrl, SHOPEE_URL } from "../lib/contact-links";
import { ShopeeIcon, WhatsAppIcon } from "./OrderPlatformIcons";
import ProductDetailModal from "./ProductDetailModal";
import ProductVisual from "./ProductVisual";
import BlurText from "./reactbits/BlurText";
import ScrollReveal from "./reactbits/ScrollReveal";

function OrderLinks({ product }) {
  const message = `Halo Ainun Official, saya ingin bertanya dan memesan ${product.name}.`;

  return (
    <div className="order-box">
      <span className="order-box-label">Pilih Platform Order</span>
      <div className="order-actions">
        <a
          className="order-button order-button--whatsapp"
          href={getWhatsAppUrl(message)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Tanyakan ${product.name} melalui WhatsApp`}
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
        <a
          className="order-button order-button--shopee"
          href={SHOPEE_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Lihat toko Ainun Official di Shopee"
        >
          <ShopeeIcon />
          Shopee
        </a>
      </div>
    </div>
  );
}

function SizeChart({ product }) {
  return (
    <div className="size-chart" id={`size-${product.id}`}>
      <h3>Size Chart</h3>
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
  );
}

function ProductRow({ product, index }) {
  return (
    <ScrollReveal
      as="article"
      className="catalog-product"
      delay={index * 90}
      id={product.id}
    >
      <ProductVisual product={product} />
      <div className="product-content">
        <h3 className="product-name">
          <Link href={`/produk/${product.slug}`}>{product.name}</Link>
        </h3>
        <div className="product-main">
          <div className="product-description">
            <h3>Deskripsi:</h3>
            <ul>
              {product.description.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <ProductDetailModal product={product} />
          </div>
          <div className="order-panel">
            <h3>Warna &amp; Price</h3>
            <div className="color-list">
              {product.colors.map((color) => (
                <span className="color-option" key={color.name}>
                  <span
                    className="color-dot"
                    style={{ backgroundColor: color.hex }}
                    aria-hidden="true"
                  />
                  {color.name}
                </span>
              ))}
            </div>
            {product.prices ? (
              <div className="price-options">
                {product.prices.map((price) => (
                  <span className="price-option" key={price.label}>
                    <span>{price.label}:</span>
                    <strong>{formatPrice(price.value)}</strong>
                  </span>
                ))}
              </div>
            ) : (
              <span className="price-chip">{formatPrice(product.price)}</span>
            )}
            <OrderLinks product={product} />
          </div>
        </div>
        <SizeChart product={product} />
      </div>
    </ScrollReveal>
  );
}

export default function ProductCatalog() {
  return (
    <section className="catalog-section" id="katalog">
      <div className="section-heading">
        <p className="section-kicker">Katalog Produk</p>
        <BlurText as="h2" text="Pilih Koleksi Favoritmu" />
        <p>
          Tersedia dalam berbagai pilihan warna dan ukuran. Klik produk untuk
          melihat detail dan melakukan pemesanan melalui WhatsApp atau Shopee.
        </p>
      </div>
      <div className="catalog-list">
        {products.map((product, index) => (
          <ProductRow key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
