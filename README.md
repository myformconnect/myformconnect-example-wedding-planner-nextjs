# Aurelle Weddings — Royal Indian Luxury Wedding Planner

A refined, high-performance wedding planning agency landing page built with **Next.js 16 (App Router)**, **React 19**, **JavaScript**, and **Vanilla CSS**.

The site represents **Aurelle Weddings**, a luxury wedding planning studio specializing in Royal Indian weddings, Western ceremonies, scenic destination celebrations, and intimate gatherings.

---

## Brand & Visual System

- **Primary Color Palette:**
  - Background: `#F8F5EF` — Warm Ivory
  - Alternate Background: `#EFE8DC` — Soft Champagne Beige
  - Primary Typography: `#34332D` — Warm Charcoal
  - Secondary Typography: `#777166` — Muted Taupe
  - Accent Detail: `#A68A55` — Antique Gold
  - Secondary Accent: `#777D66` — Muted Olive
  - Borders: `#DED5C6` — Subtle Warm Beige
  - White Surfaces: `#FFFDF9`
- **Typography:**
  - Headings: `Cormorant Garamond` (Google Fonts via `next/font/google`)
  - Body & UI: `DM Sans` (Google Fonts via `next/font/google`)

---

## Website Structure (Sections)

1. **Header & Navigation (`Header.js`)**: Brand wordmark with royal lotus emblem, desktop navigation, scroll-triggered background transition, and accessible mobile menu.
2. **Hero (`Hero.js`)**: Cinematic editorial photograph of a Rajasthani heritage palace courtyard ceremony with priority loading and dual CTAs.
3. **Introduction & Philosophy (`Introduction.js`)**: Two-column editorial narrative accompanied by luxury stationery and floral details.
4. **Wedding Experiences (`WeddingExperiences.js`)**: Curated cards for Indian Weddings, Western Weddings, Destination Weddings, and Intimate Celebrations with interactive enquiry pre-selection.
5. **What We Take Care Of (`PlanningServices.js`)**: Four core planning pillars with refined line icons and elegant spacing.
6. **Our Planning Approach (`PlanningProcess.js`)**: Three-step editorial journey (01 Discover, 02 Curate, 03 Celebrate).
7. **Inspiration Gallery (`InspirationGallery.js`)**: Curated 6-image editorial moodboard with descriptive alt attributes.
8. **Consultation CTA (`ConsultationCTA.js`)**: Refined closing banner with dual enquiry and scheduling buttons.
9. **Enquiry Form (`EnquiryForm.js`)**: Accessible 10-field inquiry form integrated with **MyFormCapture**.
10. **Consultation Scheduling (`BookingSection.js`)**: 15-minute introductory consultation booking section integrated with **MyFormConnect**.
11. **Footer (`Footer.js`)**: Minimalist footer with studio contact placeholders and copyright.

---

## Getting Started

### Prerequisites

- Node.js 18.17+ or 20+ (tested on Node v22)
- npm 9+

### Installation

```bash
# Clone or navigate to the project directory
cd myformconnect-example-wedding-planner-nextjs

# Install dependencies
npm install
```

### Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` to configure integrations:

```env
# Website URL
NEXT_PUBLIC_SITE_URL=https://aurelleweddings.com

# MyFormCapture Integration
NEXT_PUBLIC_MYFORMCAPTURE_ENDPOINT=https://api.myformconnect.com/v1/capture
NEXT_PUBLIC_MYFORMCAPTURE_FORM_ID=your-form-uuid-here

# MyFormConnect Booking Widget Integration
NEXT_PUBLIC_MYFORMCONNECT_WIDGET_JS_URL=https://widget.myformconnect.com/embed.js
NEXT_PUBLIC_MYFORMCONNECT_WIDGET_CSS_URL=https://widget.myformconnect.com/embed.css
NEXT_PUBLIC_MYFORMCONNECT_BOOKING_FORM_ID=your-booking-uuid-here
```

### Development Server

Run the development server locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Create an optimized production build:

```bash
npm run build
npm run start
```

### Static Export (Optional)

To export the site as static HTML/CSS for hosting on S3, Cloudflare Pages, or GitHub Pages:

Add `output: 'export'` to `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
```

Then run:

```bash
npm run build
```

The static files will be exported to the `out/` directory.

---

## Integration Details

### 1. MyFormCapture (Wedding Enquiry Form)

The enquiry form in `src/components/EnquiryForm.js` captures:
- Full Name (required)
- Email Address (required, validated)
- Phone Number (optional)
- Wedding Type (required select)
- Approximate Date (optional)
- Preferred Destination / Venue (optional)
- Estimated Guest Count (optional select)
- Approximate Budget (optional select)
- Additional Details & Vision (optional)
- Privacy Consent (required)
- Hidden source tag: `aurelle-weddings-website`

**Behavior:**
- While `NEXT_PUBLIC_MYFORMCAPTURE_FORM_ID` is unset or blank, the form operates in a safe **Preview/Demo Mode**, validating all input rules and simulating the confirmed submission state so clients can preview the entire journey.
- Once `NEXT_PUBLIC_MYFORMCAPTURE_FORM_ID` is set, submissions are sent via `POST` JSON payload directly to `NEXT_PUBLIC_MYFORMCAPTURE_ENDPOINT`.

### 2. MyFormConnect (Consultation Scheduling Widget)

The scheduling container in `src/components/BookingSection.js`:
- Configured for an **Introductory Consultation (15 minutes)**.
- While `NEXT_PUBLIC_MYFORMCONNECT_BOOKING_FORM_ID` is unset, an editorial placeholder card is rendered showing the exact configuration steps.
- When `NEXT_PUBLIC_MYFORMCONNECT_BOOKING_FORM_ID` is provided, the widget script and styles are dynamically loaded and mounted to `#myformconnect-booking-container`.

---

## Replacing Images

All images are stored in `public/images/`:

| File | Purpose | Recommended Aspect Ratio |
| :--- | :--- | :--- |
| `hero-palace-wedding.jpg` | Main hero photograph | 16:9 (Landscape) |
| `intro-wedding-details.jpg` | Brand philosophy section | 4:3 (Landscape) |
| `exp-indian-weddings.jpg` | Experience card 1 | 16:10 or 4:3 |
| `exp-western-weddings.jpg` | Experience card 2 | 16:10 or 4:3 |
| `exp-destination-weddings.jpg` | Experience card 3 | 16:10 or 4:3 |
| `exp-intimate-celebrations.jpg` | Experience card 4 | 16:10 or 4:3 |
| `gallery-palace-ceremony.jpg` | Gallery image 1 | 3:4 (Portrait) |
| `gallery-floral-mandap.jpg` | Gallery image 2 | 4:3 (Landscape) |
| `gallery-garden-celebration.jpg` | Gallery image 3 | 4:3 (Landscape) |
| `gallery-reception-tablescape.jpg`| Gallery image 4 | 4:3 (Landscape) |
| `gallery-destination-twilight.jpg`| Gallery image 5 | 16:9 (Landscape) |
| `gallery-intimate-details.jpg` | Gallery image 6 | 1:1 (Square) |

Simply replace any file in `public/images/` with your own asset while retaining the filename, or edit `src/lib/siteConfig.js`.

---

## License & Credits

- Design & Code: &copy; 2026 Aurelle Weddings.
- Built for MyFormConnect demonstration and integration testing.
