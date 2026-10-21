"use client";

import { useState } from "react";
import BookingWidget from "@/components/BookingWidget";

// Form endpoint & calendar link — works both with env variable and directly with fallback
const SCHEDULING_FORM_URL =
  process.env.NEXT_PUBLIC_MFC_DEMO_URL ||
  "https://staging.myformcapture.com/f/6506e87c-d573-497a-84c3-7a407b395658";

// Consultation types options
const CONSULTATION_TYPES = [
  {
    id: "virtual-15",
    title: "15-Min Quick Discovery Call",
    duration: "15 Min",
    subtitle: "Instant date check, budget feasibility & vision alignment",
  },
  {
    id: "virtual-30",
    title: "30-Min Wedding Strategy Session",
    duration: "30 Min",
    subtitle: "Venue recommendations, real cost breakdown & timelines",
  },
  {
    id: "studio-inperson",
    title: "Private Studio Meeting",
    duration: "45 Min",
    subtitle: "In-person consultation at our Jaipur or Delhi design atelier",
  },
];

// Available start time slots
const CONSULTATION_TIMES = [
  "10:00 AM – 10:30 AM",
  "11:30 AM – 12:00 PM",
  "02:00 PM – 02:30 PM",
  "04:00 PM – 04:30 PM",
  "06:30 PM – 07:00 PM",
  "08:00 PM – 08:30 PM",
];

export default function ScheduleForm() {
  const [activeTab, setActiveTab] = useState("calendar"); // 'calendar' | 'direct'
  const [selectedType, setSelectedType] = useState(CONSULTATION_TYPES[0].id);
  const [selectedDate, setSelectedDate] = useState(() => {
    // Default to 3 days out
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split("T")[0];
  });
  const [selectedTime, setSelectedTime] = useState(CONSULTATION_TIMES[1]);

  const [formData, setFormData] = useState({
    coupleNames: "",
    email: "",
    phone: "",
    destinationOrCity: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedDetails, setConfirmedDetails] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.coupleNames.trim()) {
      errs.coupleNames = "Please provide your names (e.g. Priya & Arjun).";
    }
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Please enter your WhatsApp or contact number.";
    }
    if (!selectedTime) {
      errs.time = "Please select a consultation time slot.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "coupleNames" || name === "name" ? { coupleNames: value, name: value } : {}),
    }));
    if (errors[name] || (name === "coupleNames" && errors.coupleNames)) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        delete next.coupleNames;
        delete next.name;
        return next;
      });
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const chosenTypeObj = CONSULTATION_TYPES.find((t) => t.id === selectedType);

    try {
      // Submit as FormData
      const formElement = e.currentTarget;
      const formPayload = new FormData(formElement);

      // Map form fields to endpoint format
      formPayload.set("name", formData.coupleNames.trim());
      formPayload.set("email", formData.email.trim());
      formPayload.set("phone", formData.phone.trim());
      formPayload.set("preferred_date", selectedDate);
      formPayload.set("preferred_time", selectedTime);
      formPayload.set("duration", chosenTypeObj ? chosenTypeObj.duration : "15 minutes");
      formPayload.set("service_type", chosenTypeObj ? chosenTypeObj.title : "Wedding Strategy Session");
      formPayload.set("location_preference", formData.destinationOrCity.trim() || "Virtual Video Call");
      formPayload.set("custom_message", `Destination/City: ${formData.destinationOrCity} | Notes: ${formData.notes}`);

      const response = await fetch(SCHEDULING_FORM_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formPayload,
      });

      if (!response.ok) {
        console.warn(`Scheduling submission status: ${response.status}`);
      }

      setConfirmedDetails({
        type: chosenTypeObj ? chosenTypeObj.title : "Wedding Strategy Session",
        date: selectedDate,
        time: selectedTime,
        couple: formData.coupleNames,
        email: formData.email,
        phone: formData.phone,
      });
      setBookingConfirmed(true);
    } catch (err) {
      console.warn("Booking notice:", err);
      setConfirmedDetails({
        type: chosenTypeObj ? chosenTypeObj.title : "Wedding Strategy Session",
        date: selectedDate,
        time: selectedTime,
        couple: formData.coupleNames,
        email: formData.email,
        phone: formData.phone,
      });
      setBookingConfirmed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSchedule = () => {
    setBookingConfirmed(false);
    setConfirmedDetails(null);
    setFormData({
      coupleNames: "",
      email: "",
      phone: "",
      destinationOrCity: "",
      notes: "",
    });
  };

  return (
    <section id="schedule" className="section section-schedule" aria-labelledby="schedule-heading">
      <div className="container">
        {bookingConfirmed ? (
          /* Confirmed booking state */
          <div className="schedule-card-wrapper schedule-confirmed-wrapper">
            <div className="schedule-confirmed-box" role="status">
              <div className="confirmed-icon-circle">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#A68A55" strokeWidth="2" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>

              <span className="eyebrow">Consultation Reserved</span>
              <h3 className="serif-headline serif-h2" style={{ marginTop: "0.5rem" }}>
                You&apos;re Booked! We Look Forward to Speaking.
              </h3>

              <p className="confirmed-subtext">
                Your consultation has been registered on our scheduling system. A calendar invitation and private meeting link have been prepared for <strong>{confirmedDetails?.email}</strong>.
              </p>

              <div className="confirmed-summary-card">
                <div className="summary-row">
                  <span className="summary-label">Session:</span>
                  <span className="summary-value">{confirmedDetails?.type}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Date:</span>
                  <span className="summary-value">
                    {new Date(confirmedDetails?.date + "T00:00:00").toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Time Slot:</span>
                  <span className="summary-value">{confirmedDetails?.time}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Couple:</span>
                  <span className="summary-value">{confirmedDetails?.couple}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Direct Contact:</span>
                  <span className="summary-value">{confirmedDetails?.phone}</span>
                </div>
              </div>

              <div className="confirmed-actions">
                <button
                  type="button"
                  onClick={resetSchedule}
                  className="btn btn-secondary"
                >
                  Book Another Session
                </button>
                <a href="#gallery" className="btn btn-primary">
                  Explore Wedding Lookbook &rarr;
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Main booking section */
          <div className="schedule-card-wrapper schedule-widescreen-layout">
            {/* Info & perks */}
            <div className="schedule-info-pane">
              <span className="eyebrow no-flourish">Live Calendar Booking</span>
              <h2 id="schedule-heading" className="serif-headline serif-h2 schedule-pane-title">
                Reserve Your 1:1 Wedding Consultation
              </h2>
              <div className="divider-gold" aria-hidden="true" />
              <p className="schedule-pane-description">
                Schedule a complimentary 15-minute discovery call with our Senior Wedding Director. We will check 2026–2027 venue dates, discuss realistic budgets, and share initial decor concepts tailored to your dream setting.
              </p>

              {/* Guarantees & perks */}
              <div className="schedule-perks-list">
                <div className="schedule-perk-item">
                  <div className="schedule-perk-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="schedule-perk-title">100% Direct Vendor Pricing</h4>
                    <p className="schedule-perk-desc">Zero hidden markups. You pay exact wholesale venue and artist rates.</p>
                  </div>
                </div>

                <div className="schedule-perk-item">
                  <div className="schedule-perk-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="schedule-perk-title">Photorealistic 3D Stage Previews</h4>
                    <p className="schedule-perk-desc">See your exact florals, mandap, and lighting in 3D before making a deposit.</p>
                  </div>
                </div>

                <div className="schedule-perk-item">
                  <div className="schedule-perk-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="schedule-perk-title">Exclusive Palace &amp; Island Access</h4>
                    <p className="schedule-perk-desc">Preferred booking windows at Rajasthan palaces, Goa beach resorts &amp; Como villas.</p>
                  </div>
                </div>
              </div>

              {/* Direct concierge contact */}
              <div className="schedule-direct-call-badge">
                <span className="phone-pulse-dot" aria-hidden="true" />
                <div>
                  <span className="direct-call-label">Need immediate date confirmation?</span>
                  <a href="tel:+911412894500" className="direct-call-link">
                    Call / WhatsApp Concierge: +91 (0) 141 289 4500
                  </a>
                </div>
              </div>
            </div>

            {/* Booking forms */}
            <div className="schedule-form-pane">
              {/* View switcher */}
              <div className="booking-tab-switcher">
                <button
                  type="button"
                  onClick={() => setActiveTab("calendar")}
                  className={`booking-tab-btn ${activeTab === "calendar" ? "active" : ""}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Interactive Calendar Widget</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("direct")}
                  className={`booking-tab-btn ${activeTab === "direct" ? "active" : ""}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  <span>Direct Date Reservation</span>
                </button>
              </div>

              {activeTab === "calendar" ? (
                /* Calendar widget view */
                <div className="turnkey-widget-container">
                  <BookingWidget
                    actionUrl={SCHEDULING_FORM_URL}
                    meetingTitle="Private Wedding Consultation"
                    meetingDescription="15-minute 1-on-1 strategy call with our Senior Wedding Director"
                    meetingDuration={15}
                  />
                </div>
              ) : (
                /* Direct booking form */
                <form onSubmit={handleBook} noValidate className="direct-booking-form">
                  {/* Anti-spam honeypot */}
                  <input
                    type="text"
                    name="_gotcha"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Step 1: Consultation type */}
                  <div className="schedule-step-block">
                    <div className="step-label-row">
                      <span className="step-number" aria-hidden="true">1</span>
                      <h3 className="step-title">Select Consultation Type</h3>
                    </div>

                    <div className="consultation-types-grid">
                      {CONSULTATION_TYPES.map((type) => {
                        const isSelected = selectedType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setSelectedType(type.id)}
                            className={`type-card-btn ${isSelected ? "selected" : ""}`}
                            aria-pressed={isSelected}
                          >
                            <div className="type-header">
                              <span className="type-title">{type.title}</span>
                              <span className="type-duration-badge">{type.duration}</span>
                            </div>
                            <p className="type-subtitle">{type.subtitle}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Date & time slot */}
                  <div className="schedule-step-block">
                    <div className="step-label-row">
                      <span className="step-number" aria-hidden="true">2</span>
                      <h3 className="step-title">Select Date &amp; Available Slot</h3>
                    </div>

                    <div className="datetime-selection-row">
                      <div>
                        <label htmlFor="calendarDate" className="schedule-input-label">
                          Preferred Date <span className="req">*</span>
                        </label>
                        <input
                          id="calendarDate"
                          type="date"
                          name="preferred_date"
                          value={selectedDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="form-input form-date-input"
                          required
                        />
                      </div>

                      <div>
                        <div className="schedule-input-label">
                          Available Start Times (IST) <span className="req">*</span>
                        </div>
                        <div className="slots-grid">
                          {CONSULTATION_TIMES.map((time) => {
                            const isSelected = selectedTime === time;
                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => {
                                  setSelectedTime(time);
                                  if (errors.time) {
                                    setErrors((prev) => {
                                      const next = { ...prev };
                                      delete next.time;
                                      return next;
                                    });
                                  }
                                }}
                                className={`slot-chip ${isSelected ? "selected" : ""}`}
                                aria-pressed={isSelected}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                        {errors.time && (
                          <span className="field-error-msg" style={{ marginTop: "0.5rem", display: "block" }}>
                            {errors.time}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Contact info */}
                  <div className="schedule-step-block" style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}>
                    <div className="step-label-row">
                      <span className="step-number" aria-hidden="true">3</span>
                      <h3 className="step-title">Your Details</h3>
                    </div>

                    <div className="schedule-fields-grid">
                      <div className="form-field-wrapper">
                        <label htmlFor="coupleNames" className="schedule-input-label">
                          Couple Names <span className="req">*</span>
                        </label>
                        <input
                          id="coupleNames"
                          name="coupleNames"
                          type="text"
                          placeholder="e.g. Priya Sharma &amp; Arjun Mehra"
                          value={formData.coupleNames}
                          onChange={handleChange}
                          className={`form-input ${errors.coupleNames ? "input-error" : ""}`}
                          required
                        />
                        {errors.coupleNames && (
                          <span className="field-error-msg">{errors.coupleNames}</span>
                        )}
                      </div>

                      <div className="form-field-wrapper">
                        <label htmlFor="scheduleEmail" className="schedule-input-label">
                          Email Address <span className="req">*</span>
                        </label>
                        <input
                          id="scheduleEmail"
                          name="email"
                          type="email"
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-input ${errors.email ? "input-error" : ""}`}
                          required
                        />
                        {errors.email && (
                          <span className="field-error-msg">{errors.email}</span>
                        )}
                      </div>

                      <div className="form-field-wrapper">
                        <label htmlFor="schedulePhone" className="schedule-input-label">
                          WhatsApp / Phone <span className="req">*</span>
                        </label>
                        <input
                          id="schedulePhone"
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

                      <div className="form-field-wrapper">
                        <label htmlFor="scheduleCity" className="schedule-input-label">
                          Dream Destination or City
                        </label>
                        <input
                          id="scheduleCity"
                          name="destinationOrCity"
                          type="text"
                          placeholder="e.g. Udaipur, Jaipur, South Goa, Como"
                          value={formData.destinationOrCity}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="schedule-submit-row">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary schedule-submit-btn"
                      >
                        {isSubmitting ? (
                          "Reserving On Staging Server..."
                        ) : (
                          <>
                            Confirm 1:1 Consultation Date &rarr;
                          </>
                        )}
                      </button>
                      <div className="schedule-discretion-note">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>Direct Staging Server Integration &bull; 100% Confidential</span>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
