import { siteConfig } from "@/lib/siteConfig";

export default function PlanningServices() {
  const icons = {
    "planning-coordination": (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    "venue-destination": (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 20 9.2c0 7.3-8 11.8-8 11.8z" />
        <circle cx="12" cy="9" r="3" />
      </svg>
    ),
    "design-styling": (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    "guest-experience": (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  };

  return (
    <section id="services" className="section" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Services & Scope</span>
          <h2 id="services-heading" className="serif-headline serif-h2">
            Every detail, thoughtfully considered.
          </h2>
          <div className="divider-gold divider-gold-center" aria-hidden="true" />
          <p className="subcopy">
            We provide full-spectrum creative direction and execution, giving you complete peace of mind while crafting a celebration that feels effortless.
          </p>
        </div>

        <div className="services-grid">
          {siteConfig.services.map((service) => (
            <div key={service.id} className="service-item">
              <div className="service-icon-box" aria-hidden="true">
                {icons[service.id]}
              </div>
              <h3 className="service-item-title">{service.title}</h3>
              <p className="service-item-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
