/**
 * Aurelle Weddings — Central Site Configuration
 * Contains editable brand details, navigation, content matrices,
 * and integration configurations for MyFormCapture & MyFormConnect.
 */

export const siteConfig = {
  brand: {
    name: "Aurelle Weddings",
    tagline: "Thoughtfully Curated Celebrations",
    headline: "A celebration of your story, crafted to last a lifetime.",
    subheadline:
      "From timeless Indian traditions to intimate destination celebrations, we bring every detail together to create a wedding that feels unmistakably yours.",
    editorialPhilosophyHeading: "Every love story deserves its own setting.",
    editorialPhilosophyText:
      "We believe exceptional weddings are built around people, traditions, thoughtful design, and the moments that matter most. Our approach combines considered planning with personal details to create celebrations that feel effortless and meaningful.",
    copyright: "© 2026 Aurelle Weddings. All rights reserved.",
    // Clearly labelled placeholders for contact details
    contact: {
      emailPlaceholder: "concierge@aurelleweddings.com",
      phonePlaceholder: "+91 (0) 141 289 4500",
      locationPlaceholder: "Jaipur • Udaipur • Goa • Available Worldwide",
      disclaimer:
        "Demo portfolio & inquiry experience. Contact details are placeholders for demonstration purposes.",
    },
  },

  navigation: [
    { label: "Home", href: "#hero" },
    { label: "Our Services", href: "#services" },
    { label: "Wedding Experiences", href: "#experiences" },
    { label: "Our Approach", href: "#approach" },
    { label: "Contact", href: "#contact" },
  ],

  experiences: [
    {
      id: "indian-weddings",
      title: "Indian Weddings",
      description:
        "Traditional ceremonies, contemporary styling, cultural rituals, and thoughtful coordination across wedding festivities.",
      image: "/images/exp-indian-weddings.jpg",
      alt: "Lavish royal Indian wedding ceremony under an antique floral mandap with varmala garlands",
      formValue: "Indian wedding",
    },
    {
      id: "western-weddings",
      title: "Western Weddings",
      description:
        "Elegant ceremonies, refined receptions, floral styling, and carefully coordinated celebrations.",
      image: "/images/exp-western-weddings.jpg",
      alt: "Refined outdoor Western wedding ceremony surrounded by garden greenery and delicate white florals",
      formValue: "Western wedding",
    },
    {
      id: "destination-weddings",
      title: "Destination Weddings",
      description:
        "Considered venue selection, destination logistics, guest experiences, and wedding-day coordination.",
      image: "/images/exp-destination-weddings.jpg",
      alt: "Breathtaking destination wedding celebration overlooking scenic water at twilight",
      formValue: "Destination wedding",
    },
    {
      id: "intimate-celebrations",
      title: "Intimate Celebrations",
      description:
        "Smaller, personal gatherings designed around meaningful details, close relationships, and beautiful settings.",
      image: "/images/exp-intimate-celebrations.jpg",
      alt: "Warm candlelit evening reception table setting for an intimate wedding dinner",
      formValue: "Intimate celebration",
    },
  ],

  services: [
    {
      id: "planning-coordination",
      title: "Planning & Coordination",
      description:
        "Timelines, logistics, and coordination across the celebration.",
    },
    {
      id: "venue-destination",
      title: "Venue & Destination",
      description:
        "Venue research, destination planning, and guest arrangements.",
    },
    {
      id: "design-styling",
      title: "Design & Styling",
      description:
        "Floral direction, tablescapes, ceremony settings, and visual details.",
    },
    {
      id: "guest-experience",
      title: "Guest Experience",
      description:
        "Thoughtful hospitality, schedule coordination, and memorable guest moments.",
    },
  ],

  processSteps: [
    {
      step: "01",
      title: "Discover",
      description:
        "We learn about your story, priorities, preferred setting, and vision for the celebration.",
    },
    {
      step: "02",
      title: "Curate",
      description:
        "We develop a thoughtful planning direction around your preferences, requirements, and budget.",
    },
    {
      step: "03",
      title: "Celebrate",
      description:
        "We coordinate the details so you can focus on the people and moments that matter.",
    },
  ],

  galleryImages: [
    {
      src: "/images/gallery-palace-ceremony.jpg",
      alt: "Grand heritage palace courtyard wedding ceremony",
      title: "Heritage Palace Ceremony",
      span: "tall",
    },
    {
      src: "/images/gallery-floral-mandap.jpg",
      alt: "Opulent floral wedding canopy featuring white blooms and antique brass accents",
      title: "Floral Mandap Architecture",
      span: "normal",
    },
    {
      src: "/images/gallery-garden-celebration.jpg",
      alt: "Romantic garden wedding gathering under sun-dappled trees",
      title: "Garden Celebration",
      span: "normal",
    },
    {
      src: "/images/gallery-reception-tablescape.jpg",
      alt: "Refined wedding dinner tablescape with fine crystal, taper candles, and gold-rimmed china",
      title: "Reception Tablescape",
      span: "normal",
    },
    {
      src: "/images/gallery-destination-twilight.jpg",
      alt: "Destination wedding sunset scene along a tranquil waterfront",
      title: "Destination Scenery",
      span: "wide",
    },
    {
      src: "/images/gallery-intimate-details.jpg",
      alt: "Delicate artisanal details, heirloom rings, and soft botanical accents",
      title: "Intimate Ceremony Details",
      span: "normal",
    },
  ],

  formOptions: {
    weddingTypes: [
      { label: "Select wedding type...", value: "" },
      { label: "Indian wedding", value: "Indian wedding" },
      { label: "Western wedding", value: "Western wedding" },
      { label: "Destination wedding", value: "Destination wedding" },
      { label: "Intimate celebration", value: "Intimate celebration" },
      { label: "Other / not decided", value: "Other / not decided" },
    ],
    guestCounts: [
      { label: "Select guest count...", value: "" },
      { label: "Under 50", value: "Under 50" },
      { label: "50–100", value: "50-100" },
      { label: "100–250", value: "100-250" },
      { label: "250–500", value: "250-500" },
      { label: "500+", value: "500+" },
      { label: "Not decided", value: "Not decided" },
    ],
    budgetBands: [
      { label: "Select approximate budget (Illustrative guide)...", value: "" },
      { label: "Tier 1: Intimate & Curated (Illustrative guide)", value: "Tier 1: Intimate & Curated" },
      { label: "Tier 2: Classic Heritage Celebration (Illustrative guide)", value: "Tier 2: Classic Heritage Celebration" },
      { label: "Tier 3: Grand Multi-Day Royal Celebration (Illustrative guide)", value: "Tier 3: Grand Multi-Day Royal Celebration" },
      { label: "Tier 4: Bespoke Destination Production (Illustrative guide)", value: "Tier 4: Bespoke Destination Production" },
      { label: "Undisclosed / Custom consultation", value: "Custom consultation" },
    ],
  },

  myFormCapture: {
    endpoint: process.env.NEXT_PUBLIC_MYFORMCAPTURE_ENDPOINT || "https://api.myformconnect.com/v1/capture",
    formId: process.env.NEXT_PUBLIC_MYFORMCAPTURE_FORM_ID || "",
    source: "aurelle-weddings-website",
  },

  myFormConnect: {
    widgetJsUrl: process.env.NEXT_PUBLIC_MYFORMCONNECT_WIDGET_JS_URL || "https://widget.myformconnect.com/embed.js",
    widgetCssUrl: process.env.NEXT_PUBLIC_MYFORMCONNECT_WIDGET_CSS_URL || "https://widget.myformconnect.com/embed.css",
    bookingFormId: process.env.NEXT_PUBLIC_MYFORMCONNECT_BOOKING_FORM_ID || "",
    meetingTitle: "Aurelle Weddings — Introductory Consultation",
    meetingDuration: 15,
    description:
      "A 15-minute introductory conversation to discuss your wedding vision, preferred dates, destination ideas, and planning timeline.",
  },
};
