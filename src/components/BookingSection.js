"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

export default function BookingSection() {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const bookingFormId = siteConfig.myFormConnect.bookingFormId;
  const isWidgetConfigured = Boolean(
    bookingFormId && !bookingFormId.includes("placeholder")
  );

  useEffect(() => {
    if (!isWidgetConfigured) {
      return;
    }

    // Inject widget styles if configured
    if (siteConfig.myFormConnect.widgetCssUrl) {
      const existingLink = document.querySelector(
        `link[href="${siteConfig.myFormConnect.widgetCssUrl}"]`
      );
      if (!existingLink) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = siteConfig.myFormConnect.widgetCssUrl;
        document.head.appendChild(link);
      }
    }

    // Load scheduling script
    if (siteConfig.myFormConnect.widgetJsUrl) {
      const existingScript = document.querySelector(
        `script[src="${siteConfig.myFormConnect.widgetJsUrl}"]`
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = siteConfig.myFormConnect.widgetJsUrl;
        script.async = true;
        script.onload = () => {
          setWidgetLoaded(true);
          // Init widget if helper is available
          if (window.MyFormConnect && typeof window.MyFormConnect.init === "function") {
            try {
              window.MyFormConnect.init({
                container: "#myformconnect-booking-container",
                formId: bookingFormId,
                title: siteConfig.myFormConnect.meetingTitle,
                duration: siteConfig.myFormConnect.meetingDuration,
              });
            } catch (err) {
              console.warn("MyFormConnect initialization notice:", err);
            }
          }
        };
        script.onerror = () => {
          setLoadError(true);
        };
        document.body.appendChild(script);
      } else {
        setWidgetLoaded(true);
      }
    }
  }, [isWidgetConfigured, bookingFormId]);

  return (
    <section id="booking" className="section" aria-labelledby="booking-heading">
      <div className="container container-narrow">
        <div className="section-header">
          <span className="eyebrow">Direct Calendar Booking</span>
          <h2 id="booking-heading" className="serif-headline serif-h2">
            Schedule an Introductory Consultation
          </h2>
          <div className="divider-gold divider-gold-center" aria-hidden="true" />
          <p className="subcopy">
            Select a convenient time for an introductory 15-minute conversation with our planning director to explore your vision.
          </p>
        </div>

        <div className="booking-container-wrap">
          {/* Meeting details */}
          <div className="booking-header">
            <h3 className="serif-headline serif-h3">
              {siteConfig.myFormConnect.meetingTitle}
            </h3>
            <p style={{ marginTop: "0.5rem", color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
              {siteConfig.myFormConnect.description}
            </p>

            <div className="booking-meta-badges">
              <span className="meta-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{siteConfig.myFormConnect.meetingDuration} Minutes</span>
              </span>

              <span className="meta-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 10l5 5-5 5" />
                  <path d="M4 4v7a4 4 0 0 0 4 4h12" />
                </svg>
                <span>Private Video Conference</span>
              </span>

              <span className="meta-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Senior Planning Concierge</span>
              </span>
            </div>
          </div>

          {/* Calendar widget or placeholder */}
          <div className="booking-body">
            {isWidgetConfigured ? (
              loadError ? (
                <div className="notice-box notice-error" style={{ width: "100%" }}>
                  <p>
                    Unable to load the MyFormConnect scheduling widget at this moment. Please use the direct inquiry form above or reach out to us at {siteConfig.brand.contact.emailPlaceholder}.
                  </p>
                </div>
              ) : (
                <div
                  id="myformconnect-booking-container"
                  data-booking-id={bookingFormId}
                  data-title={siteConfig.myFormConnect.meetingTitle}
                  data-duration={siteConfig.myFormConnect.meetingDuration}
                  data-theme="royal-luxury"
                  style={{ width: "100%", minHeight: "460px" }}
                >
                  {!widgetLoaded && (
                    <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-text-secondary)" }}>
                      Loading scheduling calendar...
                    </div>
                  )}
                </div>
              )
            ) : (
              /* Setup guide when no booking ID is configured */
              <div className="widget-placeholder-card">
                <svg
                  className="widget-placeholder-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <circle cx="12" cy="15" r="2" />
                </svg>

                <h4 className="serif-headline" style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
                  MyFormConnect Widget Ready
                </h4>

                <p style={{ fontSize: "0.92rem", color: "var(--color-text-secondary)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                  The booking container is pre-configured for a 15-minute introductory consultation. Provide your dedicated booking form UUID in <code>NEXT_PUBLIC_MYFORMCONNECT_BOOKING_FORM_ID</code> to render your live calendar slots.
                </p>

                <div
                  style={{
                    backgroundColor: "var(--color-surface)",
                    padding: "1rem",
                    borderRadius: "2px",
                    border: "1px solid var(--color-border)",
                    fontSize: "0.8rem",
                    textAlign: "left",
                    color: "var(--color-text-secondary)",
                    fontFamily: "monospace",
                  }}
                >
                  <div># In your .env.local:</div>
                  <div style={{ color: "var(--color-accent)", marginTop: "0.25rem" }}>
                    NEXT_PUBLIC_MYFORMCONNECT_BOOKING_FORM_ID=your-booking-uuid-here
                  </div>
                </div>

                <div style={{ marginTop: "1.75rem" }}>
                  <a href="#enquiry" className="btn btn-secondary">
                    Use Direct Enquiry Form Instead
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
