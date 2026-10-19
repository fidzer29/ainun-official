import Image from "next/image";
import ImageReveal from "./reactbits/ImageReveal";
import TiltedCard from "./reactbits/TiltedCard";

export default function ProductVisual({ product }) {
  return (
    <TiltedCard className="product-visual">
      <ImageReveal className="product-image-reveal">
        <Image
          className="product-photo"
          src={product.coverImage}
          alt={`${product.name} - ${product.coverImageAlt}`}
          fill
          sizes="(max-width: 760px) 100vw, 35vw"
        />
      </ImageReveal>
    </TiltedCard>
  );
}
