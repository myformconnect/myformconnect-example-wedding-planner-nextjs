import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

export default function Introduction() {
  return (
    <section id="philosophy" className="section" aria-labelledby="intro-heading">
      <div className="container">
        <div className="intro-grid">
          {/* Editorial Column */}
          <div className="intro-editorial">
            <span className="eyebrow">Our Philosophy</span>
            <h2 id="intro-heading" className="serif-headline serif-h2">
              {siteConfig.brand.editorialPhilosophyHeading}
            </h2>
            <div className="divider-gold" aria-hidden="true" />
            <p>
              {siteConfig.brand.editorialPhilosophyText}
            </p>
            <p>
              Whether orchestrating a multi-day palace ceremony steeped in heritage rituals or an intimate candlelit celebration beneath ancient trees, our work is defined by warmth, discretion, and meticulous artistic direction.
            </p>

            <div className="intro-pillar-chips" aria-label="Key planning pillars">
              <span className="pillar-chip">Thoughtful Curation</span>
              <span className="pillar-chip">Cultural Artistry</span>
              <span className="pillar-chip">Effortless Hospitality</span>
              <span className="pillar-chip">Bespoke Design</span>
            </div>
          </div>

          {/* Supporting Photography Frame */}
          <div className="intro-image-frame">
            <Image
              src="/images/intro-wedding-details.jpg"
              alt="Bespoke wedding stationery suite with gold foil calligraphy, wax seal, and garden roses"
              width={640}
              height={480}
              loading="lazy"
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
