import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

export default function InspirationGallery() {
  return (
    <section id="gallery" className="section" aria-labelledby="gallery-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Aesthetic Impressions</span>
          <h2 id="gallery-heading" className="serif-headline serif-h2">
            Wedding Inspiration Gallery
          </h2>
          <div className="divider-gold divider-gold-center" aria-hidden="true" />
          <p className="subcopy">
            A visual anthology of atmospheres, textures, and settings that inspire our bespoke design work.
          </p>
        </div>

        <p className="gallery-disclaimer">
          Illustrative creative direction and aesthetic moodboard.
        </p>

        <div className="gallery-grid">
          {siteConfig.galleryImages.map((img, index) => {
            const spanClass =
              img.span === "tall"
                ? "span-tall"
                : img.span === "wide"
                ? "span-wide"
                : "";

            return (
              <figure key={index} className={`gallery-item ${spanClass}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.span === "wide" ? 800 : 500}
                  height={img.span === "tall" ? 700 : 380}
                  loading="lazy"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
                <figcaption className="gallery-caption">
                  {img.title}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
