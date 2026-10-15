import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

export default function Hero() {
  return (
    <section id="hero" className="hero-section" aria-label="Welcome">
      {/* Cinematic Background Image with eager priority */}
      <div className="hero-bg-media">
        <Image
          src="/images/hero-palace-wedding.jpg"
          alt="Royal Indian palace courtyard wedding ceremony at dusk with illuminated floral mandap"
          fill
          priority
          sizes="100vw"
          quality={90}
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />
      </div>

      {/* Elegant Atmospheric Overlay for Text Contrast */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Hero Content Panel */}
      <div className="container hero-content">
        <div className="eyebrow">{siteConfig.brand.tagline}</div>

        <h1 className="serif-headline serif-h1 hero-title">
          {siteConfig.brand.headline}
        </h1>

        <p className="hero-subtitle">
          {siteConfig.brand.subheadline}
        </p>

        <div className="hero-actions">
          <a href="#enquiry" className="btn btn-primary">
            Plan Your Wedding
          </a>
          <a href="#experiences" className="btn btn-hero-secondary">
            Explore Our Celebrations
          </a>
        </div>
      </div>
    </section>
  );
}
