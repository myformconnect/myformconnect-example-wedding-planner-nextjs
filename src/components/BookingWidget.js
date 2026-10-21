"use client";

import React, { useEffect } from "react";
import Script from "next/script";
// Load widget styling co-located directly in the same folder
import "./booking-widget.css";

// Form and endpoint settings — works with or without environment variables
const DEFAULT_BOOKING_URL =
  process.env.NEXT_PUBLIC_MFC_DEMO_URL ||
  "https://staging.myformcapture.com/f/6506e87c-d573-497a-84c3-7a407b395658";
const DEFAULT_FORM_UUID = "6506e87c-d573-497a-84c3-7a407b395658";
const DEFAULT_API_BASE = "https://staging.myformcapture.com";

export default function BookingWidget({
  actionUrl = DEFAULT_BOOKING_URL,
  meetingTitle = "Private Wedding Consultation",
  meetingDescription = "15-minute 1-on-1 strategy call with our Senior Wedding Director",
  meetingDuration = 15,
}) {
  const rawUrl = (actionUrl || DEFAULT_BOOKING_URL).trim();

  // Extract form UUID from URL or fall back to default
  const uuidMatch = rawUrl.match(
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
  );
  const uuid = uuidMatch ? uuidMatch[0] : DEFAULT_FORM_UUID;

  // Determine API base (e.g. https://staging.myformcapture.com)
  let apiBase = DEFAULT_API_BASE;
  try {
    const parsed = new URL(rawUrl);
    apiBase = parsed.origin;
  } catch {
    apiBase = DEFAULT_API_BASE;
  }

  const cleanSubmitUrl = `${apiBase}/f/${uuid}`;
  const slotsUrl = `${cleanSubmitUrl}/slots`;

  // Re-trigger render on client navigation
  useEffect(() => {
    const timer = setTimeout(() => {
      document.dispatchEvent(new Event("DOMContentLoaded"));
      document.dispatchEvent(new Event("turbo:render"));
    }, 60);

    return () => clearTimeout(timer);
  }, [actionUrl]);

  return (
    <div className="w-full booking-widget-wrapper">
      {/* Widget script */}
      <Script
        src={`${apiBase}/booking-widget.js`}
        strategy="afterInteractive"
        onLoad={() => {
          document.dispatchEvent(new Event("DOMContentLoaded"));
          document.dispatchEvent(new Event("turbo:render"));
        }}
      />

      {/* Widget mount point */}
      <div
        id="mfc-booking-widget"
        data-booking-widget=""
        data-form-uuid={uuid}
        data-api-base={apiBase}
        data-submit-url={cleanSubmitUrl}
        data-slots-url={slotsUrl}
        data-branding-name="MyFormConnect"
        data-branding-url="https://myformconnect.io"
        data-meeting-title={meetingTitle}
        data-meeting-description={meetingDescription}
        data-meeting-duration={meetingDuration}
      />
    </div>
  );
}
