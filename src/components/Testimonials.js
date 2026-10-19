import { siteConfig } from "@/lib/siteConfig";

export default function Testimonials() {
  return (
    <section className="section" id="stories" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Client Love &amp; Praise</span>
          <h2 id="testimonials-heading" className="serif-headline serif-h2">
            Words From Our Couples
          </h2>
          <div className="divider-gold divider-gold-center" aria-hidden="true" />
          <p className="subcopy">
            Read firsthand reflections from couples who entrusted their once-in-a-lifetime celebrations to our studio.
          </p>
        </div>

        <div className="testimonials-grid">
          {siteConfig.testimonials.map((item, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-stars" aria-label={`${item.rating} out of 5 stars`}>
                {[...Array(item.rating)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#A68A55" stroke="#A68A55" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <blockquote className="testimonial-quote">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="testimonial-author-meta">
                <div className="testimonial-avatar-initials">
                  {item.couple
                    .split("&")
                    .map((n) => n.trim()[0])
                    .join("&")}
                </div>
                <div>
                  <div className="testimonial-couple-name">{item.couple}</div>
                  <div className="testimonial-venue">{item.venue}</div>
                  <div className="testimonial-type-badge">{item.weddingType}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
