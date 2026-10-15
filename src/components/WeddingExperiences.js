"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";


export default function WeddingExperiences({ onSelectExperience }) {
  return (
    <section
      id="experiences"
      className="section section-alt"
      aria-labelledby="experiences-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">Our Portfolio of Styles</span>
          <h2 id="experiences-heading" className="serif-headline serif-h2">
            Celebrations, thoughtfully imagined.
          </h2>
          <div className="divider-gold divider-gold-center" aria-hidden="true" />
          <p className="subcopy">
            From grand heritage settings to intimate gatherings, discover a celebration shaped around your vision.
          </p>
        </div>

        {/* 4 Editorial Cards Grid */}
        <div className="experiences-grid">
          {siteConfig.experiences.map((exp, index) => (
            <article key={exp.id} className="experience-card">
              <div className="card-image-wrap">
                <Image
                  src={exp.image}
                  alt={exp.alt}
                  width={600}
                  height={375}
                  loading="lazy"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="card-body">
                <span className="card-number">
                  Experience 0{index + 1}
                </span>
                <h3 className="card-title">{exp.title}</h3>
                <p className="card-description">{exp.description}</p>
                <div>
                  <a
                    href="#enquiry"
                    className="btn-link"
                    aria-label={`Inquire about ${exp.title}`}
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        const selectEl = document.getElementById("weddingType");
                        if (selectEl) {
                          selectEl.value = exp.formValue;
                          // Dispatch change event to sync React state
                          selectEl.dispatchEvent(new Event("change", { bubbles: true }));
                        }
                      }
                    }}
                  >
                    <span>Explore this experience</span>
                    <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
