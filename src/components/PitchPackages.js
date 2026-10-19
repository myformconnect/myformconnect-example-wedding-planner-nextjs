import { siteConfig } from "@/lib/siteConfig";

export default function PitchPackages() {
  return (
    <section className="section section-alt" id="packages" aria-labelledby="packages-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Curated Wedding Collections</span>
          <h2 id="packages-heading" className="serif-headline serif-h2">
            Tailored Production Offerings
          </h2>
          <div className="divider-gold divider-gold-center" aria-hidden="true" />
          <p className="subcopy">
            Every celebration is individually customized. Select your preferred tier below to review deliverables and reserve your date.
          </p>
        </div>

        <div className="packages-grid">
          {siteConfig.packages.map((pkg) => (
            <div key={pkg.id} className="package-card">
              <div className="package-badge-wrap">
                <span className="package-badge">{pkg.badge}</span>
              </div>

              <h3 className="serif-headline serif-h3 package-title">{pkg.title}</h3>
              <div className="package-meta">
                <span className="package-meta-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {pkg.duration}
                </span>
                <span className="package-meta-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {pkg.idealFor}
                </span>
              </div>

              <p className="package-description">{pkg.description}</p>

              <div className="package-highlights-title">Included Atelier Services:</div>
              <ul className="package-features-list">
                {pkg.highlights.map((feat, idx) => (
                  <li key={idx} className="package-feature-item">
                    <svg className="feature-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="package-card-footer">
                <a href={pkg.ctaHref} className="btn btn-primary btn-block">
                  {pkg.ctaText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
