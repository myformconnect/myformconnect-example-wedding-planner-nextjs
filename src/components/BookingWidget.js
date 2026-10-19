"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { siteConfig } from "@/lib/siteConfig";

export default function BookingWidget({
  actionUrl = siteConfig.scheduling.actionUrl,
  meetingTitle = siteConfig.scheduling.meetingTitle,
  meetingDescription = siteConfig.scheduling.meetingDescription,
  meetingDuration = siteConfig.scheduling.meetingDuration,
}) {
  // Get UUID from URL or fallback
  const rawUrl = (actionUrl || "").trim();
  const uuidMatch = rawUrl.match(
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
  );
  const uuid = uuidMatch ? uuidMatch[0] : siteConfig.scheduling.formUuid;

  let apiBase = siteConfig.scheduling.apiBase || "https://staging.myformcapture.com";
  try {
    const parsed = new URL(rawUrl);
    apiBase = parsed.origin;
  } catch (e) {
    // Default to staging API if URL parsing fails
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
      {/* Widget styling */}
      <link rel="stylesheet" href="/booking-widget.css" />

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
