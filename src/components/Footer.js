import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer id="contact" className="site-footer" role="contentinfo">
      {/* Gold divider */}
      <div className="footer-top-accent" aria-hidden="true" />

      <div className="container">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="footer-brand">
            <Link href="#hero" className="brand-link" style={{ marginBottom: "1rem", display: "inline-flex" }}>
              <svg
                className="brand-emblem"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 4C16 11 11 16 11 22C11 25 13 27 16 27C19 27 21 25 21 22C21 16 16 11 16 4Z" />
                <path d="M16 14C12 16 7 19 6 23C5 26 8 27 10 27C13 27 15 25 16 23" />
                <path d="M16 14C20 16 25 19 26 23C27 26 24 27 22 27C19 27 17 25 16 23" />
              </svg>
              <span className="brand-wordmark">{siteConfig.brand.name}</span>
            </Link>
            <p>
              Thoughtfully curated royal Indian, Western, destination, and intimate wedding celebrations crafted with timeless elegance.
            </p>
            <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--color-accent)" }}>
              {siteConfig.brand.seasonBadge}
            </p>
          </div>

          {/* Directory links */}
          <div>
            <h4 className="footer-heading">Atelier Directory</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#schedule">Book 1:1 Consultation</a>
              </li>
              <li>
                <a href="#enquiry">Request Bespoke Proposal</a>
              </li>
              <li>
                <a href="#packages">Curated Collections</a>
              </li>
              <li>
                <a href="#why-aurelle">Why Choose Aurelle</a>
              </li>
              <li>
                <a href="#newsletter">The Bridal Dossier</a>
              </li>
            </ul>
          </div>

          {/* Wedding styles */}
          <div>
            <h4 className="footer-heading">Celebrations</h4>
            <ul className="footer-links-list">
              {siteConfig.experiences.map((exp) => (
                <li key={exp.id}>
                  <a href="#experiences">{exp.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge desk */}
          <div>
            <h4 className="footer-heading">Concierge Desk</h4>
            <div className="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>{siteConfig.brand.contact.emailPlaceholder}</span>
            </div>

            <div className="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{siteConfig.brand.contact.phonePlaceholder}</span>
            </div>

            <div className="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{siteConfig.brand.contact.locationPlaceholder}</span>
            </div>
          </div>
        </div>

        {/* Copyright & credits */}
        <div className="footer-bottom">
          <div>{siteConfig.brand.copyright}</div>
          <div>
            Powered by MyFormConnect &bull; High-Converting Wedding Landing Page
          </div>
        </div>
      </div>
    </footer>
  );
}
