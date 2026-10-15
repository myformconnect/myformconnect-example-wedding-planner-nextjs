"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

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

  const isFormConfigured = Boolean(
    siteConfig.myFormCapture.endpoint &&
      siteConfig.myFormCapture.formId &&
      !siteConfig.myFormCapture.formId.includes("placeholder")
  );

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

    if (!formData.weddingType) {
      newErrors.weddingType = "Please select a wedding type.";
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

    // Clear field-specific error upon typing
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
      if (isFormConfigured) {
        // Send payload to verified MyFormCapture endpoint
        const payload = {
          formId: siteConfig.myFormCapture.formId,
          source: siteConfig.myFormCapture.source,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          weddingType: formData.weddingType,
          approximateDate: formData.approximateDate,
          preferredDestination: formData.preferredDestination.trim(),
          guestCount: formData.guestCount,
          approximateBudget: formData.approximateBudget,
          details: formData.details.trim(),
          submittedAt: new Date().toISOString(),
        };

        const response = await fetch(siteConfig.myFormCapture.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(
            `Unable to submit enquiry at this time (Status: ${response.status}). Please try again or contact us directly.`
          );
        }

        setSubmissionStatus("success");
        setStatusMessage(
          "Thank you for sharing your vision with Aurelle Weddings. Our senior planning team has received your enquiry and will be in touch within one business day."
        );
        // Reset form upon confirmed success
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
      } else {
        // Safe demonstration simulation when real formId is not yet configured in .env
        await new Promise((resolve) => setTimeout(resolve, 800));
        setSubmissionStatus("success");
        setStatusMessage(
          "Enquiry successfully validated! (Demo Mode: Set NEXT_PUBLIC_MYFORMCAPTURE_FORM_ID in .env.local to route directly to your MyFormCapture account)."
        );
      }
    } catch (err) {
      setSubmissionStatus("error");
      setStatusMessage(
        err.message ||
          "A network error occurred while submitting your enquiry. Your details have been preserved. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enquiry" className="section section-alt" aria-labelledby="enquiry-heading">
      <div className="container container-narrow">
        <div className="section-header">
          <span className="eyebrow">Direct Studio Inquiry</span>
          <h2 id="enquiry-heading" className="serif-headline serif-h2">
            Begin Your Celebration
          </h2>
          <div className="divider-gold divider-gold-center" aria-hidden="true" />
          <p className="subcopy">
            Please share the preliminary details of your wedding. Every enquiry is handled with the utmost discretion and care.
          </p>
        </div>

        {/* Integration Status Indicator if in placeholder demo mode */}
        {!isFormConfigured && (
          <div className="notice-box notice-info" role="status">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              style={{ flexShrink: 0, marginTop: "2px" }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <div>
              <strong>MyFormCapture Integration Ready:</strong> The form is wired to the standard capture pipeline. Set <code>NEXT_PUBLIC_MYFORMCAPTURE_FORM_ID</code> in <code>.env.local</code> to activate your live backend.
            </div>
          </div>
        )}

        {/* Success Confirmation State */}
        {submissionStatus === "success" && (
          <div className="notice-box notice-success" role="alert">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              style={{ flexShrink: 0, marginTop: "2px" }}
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div>
              <strong>Enquiry Received:</strong> {statusMessage}
            </div>
          </div>
        )}

        {/* Recoverable Error State */}
        {submissionStatus === "error" && (
          <div className="notice-box notice-error" role="alert">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              style={{ flexShrink: 0, marginTop: "2px" }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <strong>Submission Notice:</strong> {statusMessage}
            </div>
          </div>
        )}

        {/* The Form Card */}
        <div className="form-card">
          <form onSubmit={handleSubmit} noValidate>
            {/* Hidden Source Field */}
            <input
              type="hidden"
              name="source"
              value={siteConfig.myFormCapture.source}
            />

            <div className="form-grid">
              {/* 1. Full Name */}
              <div>
                <label htmlFor="fullName" className="form-label">
                  Full Name <span className="required-mark" aria-hidden="true">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Radhika Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`form-input ${errors.fullName ? "has-error" : ""}`}
                  aria-required="true"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
                {errors.fullName && (
                  <span id="fullName-error" className="inline-error">
                    {errors.fullName}
                  </span>
                )}
              </div>

              {/* 2. Email Address */}
              <div>
                <label htmlFor="email" className="form-label">
                  Email Address <span className="required-mark" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? "has-error" : ""}`}
                  aria-required="true"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <span id="email-error" className="inline-error">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* 3. Phone Number */}
              <div>
                <label htmlFor="phone" className="form-label">
                  Phone Number <span className="optional-mark">(Optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* 4. Wedding Type */}
              <div>
                <label htmlFor="weddingType" className="form-label">
                  Wedding Type <span className="required-mark" aria-hidden="true">*</span>
                </label>
                <select
                  id="weddingType"
                  name="weddingType"
                  value={formData.weddingType}
                  onChange={handleChange}
                  className={`form-select ${errors.weddingType ? "has-error" : ""}`}
                  aria-required="true"
                  aria-invalid={Boolean(errors.weddingType)}
                  aria-describedby={errors.weddingType ? "weddingType-error" : undefined}
                >
                  {siteConfig.formOptions.weddingTypes.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.weddingType && (
                  <span id="weddingType-error" className="inline-error">
                    {errors.weddingType}
                  </span>
                )}
              </div>

              {/* 5. Approximate Wedding Date */}
              <div>
                <label htmlFor="approximateDate" className="form-label">
                  Approximate Date <span className="optional-mark">(Optional)</span>
                </label>
                <input
                  id="approximateDate"
                  name="approximateDate"
                  type="date"
                  value={formData.approximateDate}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* 6. Preferred Destination or Venue */}
              <div>
                <label htmlFor="preferredDestination" className="form-label">
                  Preferred Destination or Venue <span className="optional-mark">(Optional)</span>
                </label>
                <input
                  id="preferredDestination"
                  name="preferredDestination"
                  type="text"
                  placeholder="e.g. Udaipur, Lake Como, Jaipur, Goa"
                  value={formData.preferredDestination}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* 7. Estimated Guest Count */}
              <div>
                <label htmlFor="guestCount" className="form-label">
                  Estimated Guest Count <span className="optional-mark">(Optional)</span>
                </label>
                <select
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="form-select"
                >
                  {siteConfig.formOptions.guestCounts.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 8. Approximate Budget */}
              <div>
                <label htmlFor="approximateBudget" className="form-label">
                  Approximate Budget <span className="optional-mark">(Illustrative Guide)</span>
                </label>
                <select
                  id="approximateBudget"
                  name="approximateBudget"
                  value={formData.approximateBudget}
                  onChange={handleChange}
                  className="form-select"
                >
                  {siteConfig.formOptions.budgetBands.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 9. Additional Details */}
              <div className="form-group-full">
                <label htmlFor="details" className="form-label">
                  Additional Details & Vision <span className="optional-mark">(Optional)</span>
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  placeholder="Share any special traditions, styling thoughts, multi-day festivity requirements, or questions..."
                  value={formData.details}
                  onChange={handleChange}
                  className="form-textarea"
                />
              </div>

              {/* 10. Privacy Consent */}
              <div className="form-group-full">
                <label className="form-checkbox-label">
                  <input
                    id="privacyConsent"
                    name="privacyConsent"
                    type="checkbox"
                    checked={formData.privacyConsent}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={Boolean(errors.privacyConsent)}
                    aria-describedby={errors.privacyConsent ? "privacyConsent-error" : undefined}
                  />
                  <span>
                    I consent to Aurelle Weddings processing my contact information solely for responding to this celebration enquiry in accordance with privacy best practices.
                  </span>
                </label>
                {errors.privacyConsent && (
                  <span id="privacyConsent-error" className="inline-error">
                    {errors.privacyConsent}
                  </span>
                )}
              </div>
            </div>

            {/* Submission Row */}
            <div className="form-submit-row">
              <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                We respond to all inquiries within 24 to 48 business hours.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ minWidth: "220px" }}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ animation: "spin 1s linear infinite" }}
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="10" />
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Send Wedding Enquiry</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
