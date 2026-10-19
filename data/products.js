const sizeColumns = ["Ukuran", "LD", "PB", "PC", "LP", "BB"];

export const products = [
  {
    id: "afiyah-set",
    slug: "afiyah-set",
    name: "Afiyah Set",
    seoDescription:
      "Afiyah Set dari Ainun Official berbahan Crinkle Airflow Lux dengan hoodie, desain busui friendly, dan celana rok lebar.",
    coverImage: "/images/afiyah_set/afiyah_set2.JPG",
    coverImageAlt: "Model mengenakan Afiyah Set dalam tiga pilihan warna",
    description: [
      "Bahan Crinkle Airflow Lux",
      "Memiliki fitur penutup kepala (hoodie)",
      "Busui friendly",
      "Lengan dengan karet",
      "Belahan baju tunik sampai paha",
      "Celana rok bentuk payung/lebar dan memiliki saku",
    ],
    colors: [
      {
        name: "Hitam",
        hex: "#222222",
        image: "/images/afiyah_set/black_atasan.JPG",
      },
      {
        name: "Army",
        hex: "#66735d",
        image: "/images/afiyah_set/army_atasan.JPG",
      },
      {
        name: "Terracotta",
        hex: "#a65d4c",
        image: "/images/afiyah_set/teracota_atasan.JPG",
      },
    ],
    price: 295000,
    sizes: [
      ["Small (S-M)", "126", "126", "100", "110", "40-60 kg"],
      ["Big (L-XL)", "130", "128", "102", "115", "60-80 kg"],
    ],
  },
  {
    id: "elma-set",
    slug: "elma-set",
    name: "Elma Set",
    seoDescription:
      "Elma Set dari Ainun Official berbahan jersey dengan tunik lebar, desain busui friendly, dan celana kulot bersaku.",
    coverImage: "/images/elma_set/elma_set.JPG",
    coverImageAlt: "Tunik Elma Set warna hitam",
    description: [
      "Bahan jersey",
      "Baju tunik lebar",
      "Busui friendly",
      "Lengan dengan karet",
      "Celana kulot panjang dan memiliki saku",
    ],
    colors: [
      { name: "Hitam", hex: "#222222", image: "/images/elma_set/black.JPG" },
      {
        name: "Biru Navy",
        hex: "#25364d",
        image: "/images/elma_set/navy.JPG",
      },
      {
        name: "Merah Maroon",
        hex: "#853f43",
        image: "/images/elma_set/maroon.JPG",
      },
    ],
    price: 355000,
    sizes: [
      ["Small (S-M)", "146", "126", "100", "110", "40-60 kg"],
      ["Big (L-XL)", "130", "128", "102", "115", "60-80 kg"],
    ],
  },
  {
    id: "naila-set",
    slug: "naila-set",
    name: "Naila Set",
    seoDescription:
      "Naila Set dari Ainun Official memadukan kemeja flanel oversize dan rok celana dengan pilihan harga satuan atau set.",
    coverImage: "/images/naila_set/naila_set2.JPG",
    coverImageAlt: "Kemeja flanel Naila Set warna coklat",
    description: [
      "Bahan kemeja: flanel",
      "Bahan rok celana: garbadine",
      "Size kemeja oversize dan memiliki saku",
      "Lengan dengan kancing",
      "Celana rok dengan saku dan tali",
    ],
    colors: [
      {
        name: "Kemeja: Coklat",
        hex: "#80604e",
        image: "/images/naila_set/brown-1.JPG",
      },
      {
        name: "Celana rok: Coklat",
        hex: "#80604e",
        image: "/images/naila_set/brown_strong.JPG",
      },
      {
        name: "Celana rok: Hitam",
        hex: "#222222",
        image: "/images/naila_set/black-1.JPG",
      },
    ],
    prices: [
      { label: "Only Kemeja", value: 170000 },
      { label: "Only Celana Rok", value: 235000 },
      { label: "One Set", value: 296000 },
    ],
    sizes: [
      ["Kemeja", "108", "75", "-", "-", "All Size"],
      ["Celana Rok", "-", "-", "100", "112", "All Size"],
    ],
  },
];

export { sizeColumns };

export function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}
