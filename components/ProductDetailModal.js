"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { formatPrice, sizeColumns } from "../data/products";
import { getWhatsAppUrl, SHOPEE_URL } from "../lib/contact-links";
import { ShopeeIcon, WhatsAppIcon } from "./OrderPlatformIcons";

function ProductPrice({ product }) {
  if (!product.prices) {
    return <p className="detail-price">{formatPrice(product.price)}</p>;
  }

  return (
    <div className="detail-price-list">
      {product.prices.map((price) => (
        <p key={price.label}>
          <span>{price.label}</span>
          <strong>{formatPrice(price.value)}</strong>
        </p>
      ))}
    </div>
  );
}

function DetailSizeChart({ product }) {
  return (
    <div className="detail-size-chart">
      <h3>Panduan ukuran</h3>
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

export default function ProductDetailModal({ product }) {
  const dialogRef = useRef(null);
  const pointerStart = useRef(null);
  const [activeImage, setActiveImage] = useState(0);
  const galleryImages = product.colors;
  const activeColor = galleryImages[activeImage];
  const message = `Halo Ainun Official, saya ingin bertanya dan memesan ${product.name}.`;

  function moveGallery(direction) {
    setActiveImage(
      (current) =>
        (current + direction + galleryImages.length) % galleryImages.length,
    );
  }

  function handleGalleryKeyDown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveGallery(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveGallery(-1);
    }
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        className="detail-link"
        type="button"
        onClick={() => {
          setActiveImage(0);
          dialogRef.current?.showModal();
        }}
        aria-haspopup="dialog"
        aria-label={`Lihat detail dan pesan ${product.name}`}
      >
        Lihat Detail &amp; Pesan
      </button>

      <dialog
        className="product-detail-dialog"
        ref={dialogRef}
        aria-labelledby={`detail-title-${product.id}`}
        onClose={() => setActiveImage(0)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <div className="detail-modal">
          <button
            className="detail-close"
            type="button"
            onClick={closeDialog}
            aria-label="Tutup detail produk"
            autoFocus
          >
            <X aria-hidden="true" />
          </button>

          <section
            className="detail-gallery"
            aria-label={`Galeri foto ${product.name}`}
            tabIndex={0}
            onKeyDown={handleGalleryKeyDown}
            onPointerDown={(event) => {
              pointerStart.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (pointerStart.current === null) return;
              const distance = event.clientX - pointerStart.current;
              pointerStart.current = null;
              if (Math.abs(distance) > 40) moveGallery(distance < 0 ? 1 : -1);
            }}
            onPointerCancel={() => {
              pointerStart.current = null;
            }}
          >
            <Image
              className="detail-gallery-photo"
              src={activeColor.image}
              alt={`${product.name} - ${activeColor.name}`}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            {galleryImages.length > 1 ? (
              <>
                <button
                  className="gallery-arrow gallery-arrow--previous"
                  type="button"
                  onClick={() => moveGallery(-1)}
                  aria-label="Gambar sebelumnya"
                >
                  <ChevronLeft aria-hidden="true" />
                </button>
                <button
                  className="gallery-arrow gallery-arrow--next"
                  type="button"
                  onClick={() => moveGallery(1)}
                  aria-label="Gambar berikutnya"
                >
                  <ChevronRight aria-hidden="true" />
                </button>
                <div className="gallery-pagination" aria-live="polite">
                  {galleryImages.map((color, index) => (
                    <button
                      className={`gallery-dot${index === activeImage ? " is-active" : ""}`}
                      key={`${color.name}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`Lihat foto ${color.name}`}
                      aria-pressed={index === activeImage}
                      style={{ "--dot-color": color.hex }}
                    />
                  ))}
                  <span>
                    {activeImage + 1} / {galleryImages.length}
                  </span>
                </div>
              </>
            ) : null}
          </section>

          <div className="detail-information">
            <p className="section-kicker">Koleksi Ainun Official</p>
            <h2 id={`detail-title-${product.id}`}>{product.name}</h2>
            <ProductPrice product={product} />

            <section className="detail-copy">
              <h3>Detail produk</h3>
              <ul>
                {product.description.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </section>

            <section className="detail-colors">
              <h3>Pilihan warna</h3>
              <div className="detail-color-list">
                {product.colors.map((color, index) => (
                  <button
                    className={`detail-color${index === activeImage ? " is-selected" : ""}`}
                    key={`${color.name}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-pressed={index === activeImage}
                  >
                    <span
                      className="color-dot"
                      style={{ backgroundColor: color.hex }}
                      aria-hidden="true"
                    />
                    {color.name}
                  </button>
                ))}
              </div>
            </section>

            <DetailSizeChart product={product} />

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
        </div>
      </dialog>
    </>
  );
}
