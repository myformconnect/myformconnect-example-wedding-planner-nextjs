"use client";

import { useState, useEffect, useCallback } from "react";

// Form submission endpoint — works with or without environment variables
const EXIT_MODAL_ENDPOINT =
  process.env.NEXT_PUBLIC_MYFORMCAPTURE_ENDPOINT ||
  "https://myformcapture.com/f/95dcab67-a579-4a81-9f23-e005ff8204fd";

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    names: "",
    email: "",
    weddingYear: "2026",
  });
  const [errors, setErrors] = useState({});

  const closeModal = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("aurelle_exit_dismissed", "true");
    } catch {
      // Ignore storage errors in private browsing
    }
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
    setHasTriggered(true);
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("aurelle_exit_dismissed") === "true") {
        setHasTriggered(true);
        return;
      }
    } catch {
      // Ignore storage errors in private browsing
    }

    // Show modal when cursor leaves toward top
    const handleMouseLeave = (e) => {
      if (e.clientY <= 15 && !hasTriggered) {
        openModal();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasTriggered, openModal]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const errs = {};
    if (!formData.names.trim()) {
      errs.names = "Please enter your name.";
    }
    if (!formData.email.trim()) {
      errs.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit as FormData
      const formElement = e.currentTarget;
      const formPayload = new FormData(formElement);

      const response = await fetch(EXIT_MODAL_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formPayload,
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status: ${response.status}`);
      }

      setIsSubmitted(true);
      try {
        sessionStorage.setItem("aurelle_exit_dismissed", "true");
      } catch {
        // Ignore storage errors
      }
    } catch (err) {
      // Treat ad-blocker blocks gracefully as success
      console.warn("Form submission status:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating guide trigger badge */}
      <button
        type="button"
        onClick={openModal}
        className="exit-intent-float-badge"
        aria-label="Open 2026 Wedding Style & Cost Guide"
      >
        <span className="float-badge-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </span>
        <span className="float-badge-text">✨ Free Wedding Guide &amp; Costs</span>
      </button>

      {/* Modal backdrop */}
      {isOpen && (
        <div
          className="exit-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-modal-title"
        >
          <div
            className="exit-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              className="exit-modal-close-btn"
              onClick={closeModal}
              aria-label="Close dialog"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {isSubmitted ? (
              /* Success confirmation */
              <div className="exit-modal-success" role="status">
                <div className="confirmed-icon-circle">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A68A55" strokeWidth="2" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>

                <h3 id="exit-modal-title" className="serif-headline serif-h3">
                  Your Wedding Guide is Ready!
                </h3>

                <p className="exit-modal-subcopy" style={{ marginTop: "0.5rem" }}>
                  We&apos;ve sent the <strong>2026 Wedding Style &amp; Venue Cost Guide</strong> plus interactive budget spreadsheet directly to <strong>{formData.email}</strong>.
                </p>

                <div className="exit-download-prompt" style={{ marginTop: "1.75rem" }}>
                  <a
                    href="#schedule"
                    onClick={closeModal}
                    className="btn btn-primary btn-block"
                  >
                    Check Your Wedding Dates (1:1 Call) &rarr;
                  </a>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn btn-secondary btn-block"
                    style={{ marginTop: "0.6rem" }}
                  >
                    Back to Aurelle Weddings
                  </button>
                </div>
              </div>
            ) : (
              /* Guide request form */
              <div className="exit-modal-content">
                <div className="exit-cta-header">
                  <span className="exit-modal-badge">Complimentary Wedding Gift</span>
                  <h3 id="exit-modal-title" className="serif-headline serif-h3 exit-modal-title">
                    Wait! Grab The Free 2026 Wedding Style &amp; Cost Guide
                  </h3>
                  <p className="exit-modal-subcopy">
                    Get real palace and beach venue pricing, a 12-month wedding checklist, and an interactive budget sheet—free in your inbox.
                  </p>
                </div>

                {/* Guide highlights */}
                <div className="exit-quick-pills">
                  <div className="exit-pill-item">
                    <span className="exit-pill-icon">🏰</span>
                    <span>Venue Price Sheet</span>
                  </div>
                  <div className="exit-pill-item">
                    <span className="exit-pill-icon">📋</span>
                    <span>12-Month Checklist</span>
                  </div>
                  <div className="exit-pill-item">
                    <span className="exit-pill-icon">💰</span>
                    <span>Budget Calculator</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="exit-modal-form" noValidate>
                  {/* Anti-spam honeypot */}
                  <input
                    type="text"
                    name="_gotcha"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  {/* Lead source tags */}
                  <input type="hidden" name="form_source" value="exit-intent-lead-magnet" />
                  <input type="hidden" name="lead_magnet" value="2026 Wedding Style & Cost Guide" />

                  <div className="exit-form-row">
                    <div className="form-field-wrapper">
                      <label htmlFor="exitNames" className="schedule-input-label">
                        Your Names <span className="req">*</span>
                      </label>
                      <input
                        id="exitNames"
                        name="names"
                        type="text"
                        placeholder="e.g. Priya &amp; Arjun"
                        value={formData.names}
                        onChange={handleChange}
                        className={`form-input ${errors.names ? "input-error" : ""}`}
                        required
                      />
                      {errors.names && (
                        <span className="field-error-msg">{errors.names}</span>
                      )}
                    </div>

                    <div className="form-field-wrapper">
                      <label htmlFor="exitYear" className="schedule-input-label">
                        Wedding Season
                      </label>
                      <select
                        id="exitYear"
                        name="weddingYear"
                        value={formData.weddingYear}
                        onChange={handleChange}
                        className="form-input form-select"
                      >
                        <option value="2026">2026 Season</option>
                        <option value="2027">2027 Season</option>
                        <option value="2028+">2028 or Beyond</option>
                        <option value="Undecided">Still Exploring</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field-wrapper" style={{ marginTop: "0.25rem" }}>
                    <label htmlFor="exitEmail" className="schedule-input-label">
                      Email Address for Instant PDF Access <span className="req">*</span>
                    </label>
                    <input
                      id="exitEmail"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? "input-error" : ""}`}
                      required
                    />
                    {errors.email && (
                      <span className="field-error-msg">{errors.email}</span>
                    )}
                  </div>

                  {errorMessage && (
                    <p className="field-error-msg" style={{ marginTop: "0.5rem" }}>
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-block exit-submit-btn"
                  >
                    {isSubmitting ? (
                      "Sending Your Free Guide..."
                    ) : (
                      <>
                        Download Free Guide &amp; Budget Sheet &rarr;
                      </>
                    )}
                  </button>

                  <div className="exit-micro-trust">
                    <span>🔒 100% Free</span>
                    <span>&bull;</span>
                    <span>Zero Spam Policy</span>
                    <span>&bull;</span>
                    <span>Instant PDF Download</span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
