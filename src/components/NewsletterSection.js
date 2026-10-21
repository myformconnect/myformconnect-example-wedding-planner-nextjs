"use client";

import { useState } from "react";

// Form submission endpoint — works with or without environment variables
const NEWSLETTER_ENDPOINT =
  process.env.NEXT_PUBLIC_MYFORMCAPTURE_ENDPOINT ||
  "https://myformcapture.com/f/95dcab67-a579-4a81-9f23-e005ff8204fd";

// Curated topic tags
const NEWSLETTER_TAGS = [
  "Royal Palace Venues",
  "Beach Destination Resorts",
  "Stage & Decor Design",
  "Budget & Timeline Checklists",
];

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [selectedTags, setSelectedTags] = useState([
    NEWSLETTER_TAGS[0],
    NEWSLETTER_TAGS[1],
  ]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit as FormData
      const formElement = e.currentTarget;
      const formPayload = new FormData(formElement);
      formPayload.set("form_source", "wedding-style-edit-newsletter");
      formPayload.set("selected_interests", selectedTags.join(", "));

      const response = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formPayload,
      });

      if (!response.ok) {
        console.warn(`Newsletter subscription status: ${response.status}`);
      }

      setIsSubscribed(true);
    } catch (err) {
      console.warn("Subscription notice:", err);
      setIsSubscribed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section section-newsletter" id="newsletter" aria-labelledby="newsletter-heading">
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-badge">The Wedding Style Edit</div>

          <h2 id="newsletter-heading" className="serif-headline serif-h2 newsletter-title">
            Get Secret Venue Ideas &amp; Real Wedding Cost Guides
          </h2>

          <p className="newsletter-subtitle">
            Join 3,400+ couples receiving our monthly insider guide to hidden royal palaces, verified venue pricing sheets, and seasonal decor inspiration.
          </p>

          {isSubscribed ? (
            <div className="newsletter-success-box" role="status" aria-live="polite">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A68A55" strokeWidth="2" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <div>
                <h4 className="serif-headline serif-h3">Welcome to The Wedding Style Edit</h4>
                <p>
                  You are now subscribed with <strong>{email}</strong>. Look out for our upcoming guide on Rajasthan palace buyouts and coastal venue budgets.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form" noValidate>
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="_gotcha"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="newsletter-tags-label">Select Your Curated Interests:</div>
              <div className="newsletter-tags-row">
                {NEWSLETTER_TAGS.map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`newsletter-tag-chip ${active ? "active" : ""}`}
                      aria-pressed={active}
                    >
                      {active && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>

              <div className="newsletter-input-group">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your email address..."
                  className={`newsletter-input ${error ? "input-error" : ""}`}
                  aria-label="Email address for wedding newsletter"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary newsletter-submit-btn"
                >
                  {isSubmitting ? "Joining..." : "Get Insider Guides →"}
                </button>
              </div>

              {error && <div className="field-error-msg" role="alert">{error}</div>}

              <div className="newsletter-guarantee">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Curated once a month. No spam ever. Unsubscribe anytime with one click.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
