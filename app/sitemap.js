import { products } from "../data/products";
import { getSiteUrl } from "../lib/site-url";

export default function sitemap() {
  const siteUrl = getSiteUrl();

  return [
    {
      url: siteUrl.href,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...products.map((product) => ({
      url: new URL(`/produk/${product.slug}`, siteUrl).href,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
