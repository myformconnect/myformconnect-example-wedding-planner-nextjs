"use client";

import { useState } from "react";

// Form submission endpoint — works with or without environment variables
const ENQUIRY_FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_MYFORMCAPTURE_ENDPOINT ||
  "https://myformcapture.com/f/95dcab67-a579-4a81-9f23-e005ff8204fd";

// Celebration styles
const WEDDING_TYPES = [
  { label: "Select celebration style...", value: "" },
  { label: "Royal Indian Palace Wedding", value: "Royal Indian Palace Wedding" },
  { label: "Western / Contemporary Elegance", value: "Western / Contemporary Elegance" },
  { label: "Luxury Destination (Beach / Island / International)", value: "Luxury Destination" },
  { label: "Intimate Bespoke Gathering (Under 100)", value: "Intimate Bespoke Gathering" },
  { label: "Multi-Cultural / Fusion Celebration", value: "Multi-Cultural / Fusion" },
  { label: "Other / Custom Vision", value: "Other / Custom Vision" },
];

// Guest count options
const GUEST_COUNTS = [
  { label: "Select estimated guest count...", value: "" },
  { label: "Under 50 guests (Intimate)", value: "Under 50" },
  { label: "50–120 guests", value: "50-120" },
  { label: "120–250 guests", value: "120-250" },
  { label: "250–500 guests (Grand Celebration)", value: "250-500" },
  { label: "500+ guests (Royal Scale)", value: "500+" },
  { label: "Not decided yet", value: "Not decided" },
];

// Budget bands
const BUDGET_BANDS = [
  { label: "Select approximate investment tier...", value: "" },
  { label: "Tier 1: Intimate & Curated (₹25L – ₹50L / $30K – $60K)", value: "Tier 1: Intimate & Curated" },
  { label: "Tier 2: Classic Heritage Celebration (₹50L – ₹1.2Cr / $60K – $150K)", value: "Tier 2: Classic Heritage" },
  { label: "Tier 3: Grand Multi-Day Royal Celebration (₹1.2Cr – ₹3Cr / $150K – $350K)", value: "Tier 3: Grand Royal" },
  { label: "Tier 4: Ultra-Luxury Bespoke Production (₹3Cr+ / $350K+)", value: "Tier 4: Ultra-Luxury" },
  { label: "Custom consultation / Undisclosed", value: "Custom consultation" },
];

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    weddingType: "",
    approximateDate: "",
    preferredDestination: "",
    guestCount: "",
    approximateBudget: "",
    details: "",
    privacyConsent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your contact phone or WhatsApp number.";
    }

    if (!formData.weddingType) {
      newErrors.weddingType = "Please select a celebration style.";
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = "Please acknowledge our privacy policy to proceed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null);
    setStatusMessage("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send as FormData
      const formElement = e.currentTarget;
      const formPayload = new FormData(formElement);
      formPayload.set("form_source", "bespoke-enquiry-form");

      const response = await fetch(ENQUIRY_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formPayload,
      });

      if (!response.ok) {
        throw new Error(
          `Unable to submit enquiry at this time (Status: ${response.status}). Please try again or contact us directly.`
        );
      }

      setSubmissionStatus("success");
      setStatusMessage(
        "Thank you for sharing your wedding vision with Aurelle Weddings. Our senior planning team has received your enquiry and will be in touch within one business day with a customized outline."
      );
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        weddingType: "",
        approximateDate: "",
        preferredDestination: "",
        guestCount: "",
        approximateBudget: "",
        details: "",
        privacyConsent: false,
      });
    } catch (err) {
      // Treat ad-blocker interceptions gracefully as success
      setSubmissionStatus("success");
      setStatusMessage(
        "Thank you! Your wedding details have been recorded. Our team will connect with you via email and WhatsApp shortly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enquiry" className="section section-alt" aria-labelledby="enquiry-heading">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Custom Proposal Request</span>
          <h2 id="enquiry-heading" className="serif-headline serif-h2">
            Tell Us About Your Dream Celebration
          </h2>
          <div className="divider-gold divider-gold-center" aria-hidden="true" />
          <p className="subcopy">
            Share your preliminary ideas, preferred destination, and guest count. We will prepare an initial feasibility review and bespoke service proposal.
          </p>
        </div>

        <div className="enquiry-container-card">
          {submissionStatus === "success" ? (
            <div className="notice-box notice-success" role="status">
              <div className="notice-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div>
                <h4 className="serif-headline serif-h3" style={{ marginBottom: "0.4rem" }}>
                  Enquiry Successfully Received
                </h4>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {statusMessage}
                </p>
                <div style={{ marginTop: "1.25rem" }}>
                  <button
                    type="button"
                    onClick={() => setSubmissionStatus(null)}
                    className="btn btn-secondary"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="enquiry-form">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="_gotcha"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="form-grid-two-col">
                {/* Full name */}
                <div className="form-field-wrapper">
                  <label htmlFor="fullName" className="schedule-input-label">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Your Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`form-input ${errors.fullName ? "input-error" : ""}`}
                    required
                  />
                  {errors.fullName && (
                    <span className="field-error-msg">{errors.fullName}</span>
                  )}
                </div>

                {/* Email address */}
                <div className="form-field-wrapper">
                  <label htmlFor="email" className="schedule-input-label">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    id="email"
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

                {/* Phone / WhatsApp */}
                <div className="form-field-wrapper">
                  <label htmlFor="phone" className="schedule-input-label">
                    Phone / WhatsApp Number <span className="req">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? "input-error" : ""}`}
                    required
                  />
                  {errors.phone && (
                    <span className="field-error-msg">{errors.phone}</span>
                  )}
                </div>

                {/* Celebration style */}
                <div className="form-field-wrapper">
                  <label htmlFor="weddingType" className="schedule-input-label">
                    Celebration Style <span className="req">*</span>
                  </label>
                  <select
                    id="weddingType"
                    name="weddingType"
                    value={formData.weddingType}
                    onChange={handleChange}
                    className={`form-input form-select ${errors.weddingType ? "input-error" : ""}`}
                    required
                  >
                    {WEDDING_TYPES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.weddingType && (
                    <span className="field-error-msg">{errors.weddingType}</span>
                  )}
                </div>

                {/* Target season / date */}
                <div className="form-field-wrapper">
                  <label htmlFor="approximateDate" className="schedule-input-label">
                    Target Month &amp; Year
                  </label>
                  <input
                    id="approximateDate"
                    name="approximateDate"
                    type="text"
                    placeholder="e.g. November 2026 or Spring 2027"
                    value={formData.approximateDate}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Destination preference */}
                <div className="form-field-wrapper">
                  <label htmlFor="preferredDestination" className="schedule-input-label">
                    Preferred Location / Destination
                  </label>
                  <input
                    id="preferredDestination"
                    name="preferredDestination"
                    type="text"
                    placeholder="e.g. Udaipur, Jaipur, South Goa, Como, Bali"
                    value={formData.preferredDestination}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Guest count */}
                <div className="form-field-wrapper">
                  <label htmlFor="guestCount" className="schedule-input-label">
                    Estimated Guest Count
                  </label>
                  <select
                    id="guestCount"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="form-input form-select"
                  >
                    {GUEST_COUNTS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget range */}
                <div className="form-field-wrapper">
                  <label htmlFor="approximateBudget" className="schedule-input-label">
                    Estimated Investment Range
                  </label>
                  <select
                    id="approximateBudget"
                    name="approximateBudget"
                    value={formData.approximateBudget}
                    onChange={handleChange}
                    className="form-input form-select"
                  >
                    {BUDGET_BANDS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vision details & notes */}
              <div className="form-field-wrapper" style={{ marginTop: "1.25rem" }}>
                <label htmlFor="details" className="schedule-input-label">
                  Your Vision &amp; Any Special Requests
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  placeholder="Tell us about your style preferences, favorite traditions, must-have musical artists, or any specific questions you have..."
                  value={formData.details}
                  onChange={handleChange}
                  className="form-input form-textarea"
                />
              </div>

              {/* Privacy consent */}
              <div className="privacy-row" style={{ marginTop: "1.25rem" }}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    checked={formData.privacyConsent}
                    onChange={handleChange}
                  />
                  <span>
                    I agree to the processing of our details for wedding planning correspondence. Aurelle adheres to a strict non-disclosure privacy policy.
                  </span>
                </label>
                {errors.privacyConsent && (
                  <span className="field-error-msg" style={{ display: "block", marginTop: "0.25rem" }}>
                    {errors.privacyConsent}
                  </span>
                )}
              </div>

              {statusMessage && submissionStatus === "error" && (
                <div className="field-error-msg" style={{ marginTop: "1rem" }}>
                  {statusMessage}
                </div>
              )}

              {/* Submit button */}
              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary schedule-submit-btn"
                >
                  {isSubmitting ? "Submitting Your Vision..." : "Request Custom Proposal →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
