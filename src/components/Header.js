"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`header-wrapper ${
        isScrolled ? "header-scrolled" : "header-transparent"
      }`}
      role="banner"
    >
      <div className="container header-inner landing-header-inner">
        {/* Brand logo */}
        <Link
          href="#hero"
          className="brand-link"
          aria-label="Aurelle Weddings Home"
        >
          {/* Lotus icon */}
          <svg
            className="brand-emblem"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M16 4C16 11 11 16 11 22C11 25 13 27 16 27C19 27 21 25 21 22C21 16 16 11 16 4Z" />
            <path d="M16 14C12 16 7 19 6 23C5 26 8 27 10 27C13 27 15 25 16 23" />
            <path d="M16 14C20 16 25 19 26 23C27 26 24 27 22 27C19 27 17 25 16 23" />
          </svg>
          <div className="brand-text-stack">
            <span className="brand-wordmark">{siteConfig.brand.name}</span>
            <span className="brand-badge-sub">Wedding Atelier</span>
          </div>
        </Link>

        {/* Concierge phone & CTA */}
        <div className="landing-header-actions">
          <a
            href={`tel:${siteConfig.brand.contact.phonePlaceholder.replace(/[^+\d]/g, "")}`}
            className="landing-concierge-phone"
            aria-label="Call concierge"
          >
            <span className="phone-pulse-dot" aria-hidden="true" />
            <span className="phone-label">Concierge:</span>
            <span className="phone-number">{siteConfig.brand.contact.phonePlaceholder}</span>
          </a>

          <a href="#schedule" className="btn btn-primary header-cta-btn">
            Book Consultation
          </a>
        </div>
      </div>
    </header>
  );
}
