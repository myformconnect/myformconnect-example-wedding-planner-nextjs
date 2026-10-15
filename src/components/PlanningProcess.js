import { siteConfig } from "@/lib/siteConfig";

export default function PlanningProcess() {
  return (
    <section id="approach" className="section section-alt" aria-labelledby="process-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Our Methodology</span>
          <h2 id="process-heading" className="serif-headline serif-h2">
            From the first conversation to the final celebration.
          </h2>
          <div className="divider-gold divider-gold-center" aria-hidden="true" />
          <p className="subcopy">
            A serene, unhurried journey that transforms vision into reality with warmth, clarity, and unswerving precision.
          </p>
        </div>

        <div className="process-grid">
          {siteConfig.processSteps.map((step) => (
            <div key={step.step} className="process-step">
              <div className="step-marker" aria-hidden="true">
                {step.step}
              </div>
              <div className="step-content">
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
