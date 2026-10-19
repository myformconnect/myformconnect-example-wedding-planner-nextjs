import { siteConfig } from "@/lib/siteConfig";

export default function PitchComparison() {
  return (
    <section className="section section-pitch" id="why-aurelle" aria-labelledby="pitch-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">The Atelier Advantage</span>
          <h2 id="pitch-heading" className="serif-headline serif-h2">
            Why Discerning Couples Choose Aurelle
          </h2>
          <div className="divider-gold divider-gold-center" aria-hidden="true" />
          <p className="subcopy">
            A wedding is not just a party; it is your family&apos;s most cherished legacy milestone. Here is how our production model transforms your entire journey.
          </p>
        </div>

        <div className="pitch-comparison-grid">
          {siteConfig.pitchComparison.map((item, index) => (
            <div key={index} className="pitch-comparison-card">
              <div className="pitch-comparison-col pitch-col-problem">
                <div className="pitch-tag-badge tag-problem">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span>Typical Wedding Struggles</span>
                </div>
                <p className="pitch-col-text">{item.problem}</p>
              </div>

              <div className="pitch-comparison-divider" aria-hidden="true">
                <span className="pitch-vs-pill">VS</span>
              </div>

              <div className="pitch-comparison-col pitch-col-solution">
                <div className="pitch-tag-badge tag-solution">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>The Aurelle Experience</span>
                </div>
                <p className="pitch-col-text">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation banner */}
        <div className="pitch-cta-banner">
          <div className="pitch-cta-text">
            <h3 className="serif-headline serif-h3">Ready to experience effortless wedding production?</h3>
            <p>Schedule a 15-minute consultation with our Senior Wedding Director today.</p>
          </div>
          <a href="#schedule" className="btn btn-primary">
            Schedule Your Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
