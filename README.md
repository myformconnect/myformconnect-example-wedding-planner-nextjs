# Aurelle Weddings — Next.js Example & Demo

A clean, responsive luxury wedding atelier landing page built with **Next.js 16 (App Router)** and **React 19**. 

This repository serves as a reference implementation for integrating **[MyFormConnect](https://myformcapture.com)**:
- **Headless Lead Capture** — Custom inquiry form, exit-intent guide download modal, and newsletter subscriptions.
- **Embedded Scheduling & Booking** — Interactive 15-minute consultation booking calendar widget.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup your local environment
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see it live.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local`. All variables use the `NEXT_PUBLIC_` prefix so Next.js can access them on the client:

```env
# Site URL for SEO & preview cards
NEXT_PUBLIC_SITE_URL=https://aurelleweddings.vercel.app

# MyFormConnect endpoint (inquiries, guide download, newsletter)
NEXT_PUBLIC_MYFORMCAPTURE_ENDPOINT=https://myformcapture.com/f/95dcab67-a579-4a81-9f23-e005ff8204fd
NEXT_PUBLIC_MYFORMCAPTURE_FORM_ID=95dcab67-a579-4a81-9f23-e005ff8204fd

# Consultation calendar (booking widget)
NEXT_PUBLIC_MFC_DEMO_URL=https://staging.myformcapture.com/f/6506e87c-d573-497a-84c3-7a407b395658
NEXT_PUBLIC_MYFORMCONNECT_BOOKING_FORM_ID=6506e87c-d573-497a-84c3-7a407b395658
NEXT_PUBLIC_MYFORMCONNECT_WIDGET_JS_URL=https://staging.myformcapture.com/booking-widget.js
NEXT_PUBLIC_MYFORMCONNECT_WIDGET_CSS_URL=/booking-widget.css
```

> **💡 Good to know (Demo Mode):**  
> If form IDs are left blank or unset, forms automatically operate in **Preview/Demo Mode**. Inputs are validated and submissions are simulated with a delay, making it easy to test without firing off live webhooks.

---

## 📂 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout, fonts, and metadata
│   │   ├── page.js            # Landing page sections
│   │   └── globals.css        # Styling and tokens
│   ├── components/            # UI section components
│   └── lib/
│       └── siteConfig.js      # Site copy, options, and settings

├── public/
│   └── images/                # Optimized editorial photography assets
└── .env.example               # Starter environment file
```

---

## 🛠️ Common Developer Tasks

### 1. Updating Copy & Details
Most text, pricing packages, contact placeholders, and navigation links live in [`src/lib/siteConfig.js`](file:///d:/Work2/myformconnect-example-wedding-planner-nextjs/src/lib/siteConfig.js). You rarely need to touch the JSX inside `src/components/` just to tweak content.

### 2. Customizing Forms & Webhooks
- **Enquiry Form (`EnquiryForm.js`)**: Captures client inquiries (budget, guest count, dates). Submits payload to `NEXT_PUBLIC_MYFORMCAPTURE_ENDPOINT`.
- **Booking Widget (`BookingWidget.js` / `ScheduleForm.js`)**: Dynamically loads the MyFormConnect scheduling script into `#myformconnect-booking-container`.
- **Exit-Intent & Newsletter (`ExitIntentModal.js`, `NewsletterSection.js`)**: Reusable lead magnets that submit to MyFormConnect with custom hidden source tags.

### 3. Replacing Photos
Images live in `public/images/`. Drop in your own photos with matching names, or update image paths directly in [`src/lib/siteConfig.js`](file:///d:/Work2/myformconnect-example-wedding-planner-nextjs/src/lib/siteConfig.js).

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js local development server on port 3000 |
| `npm run build` | Builds the optimized production application |
| `npm run start` | Runs the production build locally |
| `npm run lint` | Runs ESLint checks |

---

## 🚀 Deployment & Static Export

This project is ready to deploy on **Vercel**, **Netlify**, or any Node.js hosting platform.

If you prefer exporting purely static HTML/CSS files (e.g., for GitHub Pages, Cloudflare Pages, or AWS S3):
1. In `next.config.mjs`, add `output: 'export'` and `images: { unoptimized: true }`.
2. Run `npm run build`.
3. Deploy the generated `out/` folder.
