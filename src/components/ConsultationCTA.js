export default function ConsultationCTA() {
  return (
    <section className="section" style={{ paddingTop: 0 }} aria-label="Begin Planning">
      <div className="container">
        <div className="cta-banner">
          <div className="cta-banner-content">
            <span className="eyebrow">Personalized Consultation</span>
            <h2 className="serif-headline serif-h2" style={{ marginBottom: "1rem" }}>
              Let&apos;s begin with your vision.
            </h2>
            <div className="divider-gold divider-gold-center" aria-hidden="true" />
            <p className="subcopy">
              Tell us a little about the celebration you&apos;re imagining. We&apos;d love to learn what matters most to you.
            </p>

            <div className="cta-banner-actions">
              <a href="#enquiry" className="btn btn-primary">
                Enquire About Your Wedding
              </a>
              <a href="#booking" className="btn btn-secondary">
                Schedule a Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
