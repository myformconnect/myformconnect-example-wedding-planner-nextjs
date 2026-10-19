import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

export default function Hero() {
  return (
    <section id="hero" className="hero-section" aria-label="Welcome">
      {/* Hero background image */}
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

      {/* Contrast overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Main hero content */}
      <div className="container">
        <div className="hero-content">
          {/* Availability badge */}
          <div className="hero-scarcity-pill">
            <span className="scarcity-dot" aria-hidden="true" />
            <span>{siteConfig.brand.seasonBadge}</span>
          </div>

          <h1 className="serif-headline serif-h1 hero-title">
            {siteConfig.brand.headline}
          </h1>

          <p className="hero-subtitle">
            {siteConfig.brand.subheadline}
          </p>

          {/* Action buttons */}
          <div className="hero-actions">
            <a href="#schedule" className="btn btn-primary hero-btn-main">
              Schedule 1:1 Consultation
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#enquiry" className="btn btn-hero-secondary">
              Request Custom Proposal
            </a>
          </div>

          {/* Social proof stats */}
          <div className="hero-metrics-bar">
            {siteConfig.metrics.map((item, idx) => (
              <div key={idx} className="hero-metric-item">
                <div className="hero-metric-number">{item.value}</div>
                <div className="hero-metric-label">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Press features */}
          <div className="hero-press-strip">
            <span className="press-label">Celebrated Across:</span>
            <div className="press-tags-list">
              {siteConfig.featuredIn.map((press, i) => (
                <span key={i} className="press-tag">
                  {press}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
