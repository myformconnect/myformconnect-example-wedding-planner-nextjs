"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`header-wrapper ${
        isScrolled ? "header-scrolled" : "header-transparent"
      }`}
      role="banner"
    >
      <div className="container header-inner">
        {/* Brand Wordmark & Emblem */}
        <Link
          href="#hero"
          className="brand-link"
          aria-label="Aurelle Weddings Home"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Subtle Royal Lotus Emblem */}
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
          <span className="brand-wordmark">{siteConfig.brand.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="desktop-nav"
          aria-label="Main Navigation"
          role="navigation"
        >
          {siteConfig.navigation.map((item) => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
          <a href="#enquiry" className="btn btn-primary header-cta-btn">
            Plan Your Wedding
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          type="button"
          className="mobile-nav-toggle"
          aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="7" x2="21" y2="7"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="17" x2="21" y2="17"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Accessible Mobile Menu Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`mobile-menu-drawer ${mobileMenuOpen ? "open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-menu-header">
          <div className="brand-link">
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
            <span className="brand-wordmark">{siteConfig.brand.name}</span>
          </div>
          <button
            type="button"
            className="mobile-nav-toggle"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <nav className="mobile-nav-links" aria-label="Mobile Navigation">
          {siteConfig.navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div style={{ marginTop: "auto" }}>
          <a
            href="#enquiry"
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Plan Your Wedding
          </a>
        </div>
      </div>
    </header>
  );
}
