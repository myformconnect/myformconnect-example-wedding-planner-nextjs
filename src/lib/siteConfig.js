// Aurelle Weddings — site content, packages, and integration settings


export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://aurelleweddings.vercel.app",
  brand: {
    name: "Aurelle Weddings",
    tagline: "Bespoke Luxury Wedding Atelier",
    seasonBadge: "Accepting Limited 2026–2027 Dates • 12 Celebrations Annually",
    headline: "We Design Royal Celebrations That Feel Unmistakably Yours.",
    subheadline:
      "Enjoy every moment of your celebration without the stress of multi-day logistics, vendor negotiations, or last-minute panic. From historic royal palaces to sunlit beachfront vows, our team handles every detail—so you arrive as guests of honor at your own wedding.",
    editorialPhilosophyHeading: "Every love story deserves its own setting.",
    editorialPhilosophyText:
      "We believe exceptional weddings are built around meaningful moments, timeless traditions, and effortless beauty. We combine thoughtful planning with personal touches so you and your families can celebrate with total peace of mind.",
    copyright: "© 2026 Aurelle Weddings Atelier. All rights reserved.",
    contact: {
      emailPlaceholder: "concierge@aurelleweddings.com",
      phonePlaceholder: "+91 (0) 141 289 4500",
      locationPlaceholder: "Jaipur • Udaipur • Goa • Available Worldwide",
      disclaimer:
        "Demo portfolio & inquiry experience. Contact details are placeholders for demonstration purposes.",
    },
  },

  // Proof numbers under hero
  metrics: [
    { value: "120+", label: "Luxury Weddings Produced" },
    { value: "12", label: "Exclusive Weddings Hosted Per Year" },
    { value: "100%", label: "Direct Wholesale Vendor Billing" },
    { value: "4.98 / 5", label: "Couple & Family Satisfaction" },
  ],

  // Featured press
  featuredIn: [
    "Vogue Weddings",
    "Harper's Bazaar Bride",
    "Architectural Digest",
    "WedMeGood",
    "Brides Today",
  ],

  // Traditional struggles vs our approach
  pitchComparison: [
    {
      problem: "350+ stressful hours coordinating dozens of separate vendors across decor, sound, hospitality, and rituals.",
      solution: "A dedicated Lead Wedding Director and an on-site master production team handling every single detail.",
    },
    {
      problem: "Hidden commission markups, surprise vendor fees, and sudden budget overruns.",
      solution: "100% direct vendor billing with zero hidden fees and transparent weekly budget reports.",
    },
    {
      problem: "Second-guessing how stage decor, lighting, and florals will actually look until the wedding day.",
      solution: "Photorealistic 3D stage and venue previews before a single contract is signed or flower ordered.",
    },
    {
      problem: "Family members exhausted from coordinating guest airport cabs, hotel rooms, and missing key ceremonies.",
      solution: "White-glove 24/7 guest hospitality desk, airport charter transfers, and personal luggage valets.",
    },
  ],

  // Wedding packages
  packages: [
    {
      id: "royal-heritage",
      badge: "Signature Collection",
      title: "Royal Heritage Palace Wedding",
      duration: "3 to 4 Days • 200–800 Guests",
      idealFor: "Palace celebrations in Jaipur, Udaipur, Jodhpur, or Jaisalmer",
      description:
        "Our flagship celebration: multi-day royal festivities featuring custom mandap architecture, top live musical artists, grand royal baraat coordination, and curated multi-course dining.",
      highlights: [
        "Full palace buyout management & royal protocol coordination",
        "Photorealistic 3D venue design for Sangeet, Mehendi, Wedding & Reception",
        "Celebrity & traditional folk artist bookings & concert-grade sound",
        "Dedicated guest concierge for airport transfers & welcome hampers",
        "On-site master team of 12+ wedding coordinators across all days",
      ],
      ctaText: "Check Palace Dates",
      ctaHref: "#schedule",
    },
    {
      id: "bespoke-destination",
      badge: "Destination Elite",
      title: "Coastal & International Destination",
      duration: "2 to 3 Days • 80–250 Guests",
      idealFor: "Goa, Thailand, Lake Como, Dubai, or Bali",
      description:
        "Turnkey destination celebrations blending relaxed resort luxury with world-class aesthetics. We handle international logistics, guest flight tracking, beachfront licensing, and unforgettable dinner parties.",
      highlights: [
        "Full destination venue scouting & private resort buyout management",
        "Sunset beach & cliffside ceremony production",
        "Cross-border vendor coordination & international hospitality team",
        "Personalized digital guest itineraries & travel concierge",
        "Day-after recovery brunch & twilight catamaran cocktail party",
      ],
      ctaText: "Check Destination Dates",
      ctaHref: "#schedule",
    },
    {
      id: "intimate-atelier",
      badge: "Artisanal & Curated",
      title: "Intimate Estate & Vineyard Celebration",
      duration: "1 to 2 Days • 30–100 Guests",
      idealFor: "Heritage havelis, private vineyard retreats & family estates",
      description:
        "Designed for couples who desire an intimate, heartwarming celebration focusing on farm-to-table culinary tasting menus, heirloom floral artistry, and deep connection with their closest circle.",
      highlights: [
        "Custom tablescapes, hand-calligraphy stationery & signature scents",
        "Candlelit garden dining & chef-curated tasting menus",
        "Live acoustic chamber & classical musicians",
        "Documentary-style wedding photography & cinematography direction",
        "Personalized planning directly with our founding director",
      ],
      ctaText: "Check Estate Dates",
      ctaHref: "#schedule",
    },
  ],

  // Couple testimonials
  testimonials: [
    {
      quote:
        "Aurelle orchestrated our 3-day royal celebration in Udaipur with complete perfection. From welcoming 400 guests to the breathtaking floating mandap, Kabir and I didn't worry for even one second. Our families actually enjoyed every moment!",
      couple: "Ananya & Kabir Singhania",
      venue: "Taj Lake Palace & Jagmandir Island, Udaipur",
      rating: 5,
      weddingType: "Royal Destination Wedding",
    },
    {
      quote:
        "We live in London and were planning a destination wedding in Goa. Aurelle’s transparent budget tracking, 3D decor renders, and quick WhatsApp communication gave us 100% peace of mind. The decor was breathtaking.",
      couple: "Sophie & Rohan Mehra",
      venue: "The Leela Beachfront, South Goa",
      rating: 5,
      weddingType: "Coastal Destination Celebration",
    },
    {
      quote:
        "Their direct vendor billing policy saved us over 20% on production while delivering floral decor and lighting that stunned all our guests. Hiring Aurelle was hands down the best investment we made for our wedding.",
      couple: "Devika & Siddharth Kapoor",
      venue: "Samode Palace, Jaipur",
      rating: 5,
      weddingType: "Heritage Royal Celebration",
    },
  ],

  experiences: [
    {
      id: "indian-weddings",
      title: "Royal Indian Weddings",
      description:
        "Opulent palace settings, timeless cultural rituals, bespoke mandap architecture, and vibrant multi-day sangeet festivities.",
      image: "/images/exp-indian-weddings.jpg",
      alt: "Lavish royal Indian wedding ceremony under an antique floral mandap with varmala garlands",
      formValue: "Royal Indian Palace Wedding",
    },
    {
      id: "destination-weddings",
      title: "Coastal & Destination",
      description:
        "Sunset seaside vows, private villa buyouts, catamaran cocktail parties, and seamless international guest logistics.",
      image: "/images/exp-destination-weddings.jpg",
      alt: "Breathtaking destination wedding celebration overlooking scenic water at twilight",
      formValue: "Luxury Destination",
    },
    {
      id: "western-weddings",
      title: "Contemporary Elegance",
      description:
        "Sophisticated garden ceremonies, candlelit ballroom receptions, timeless white floral installations, and refined dining.",
      image: "/images/exp-western-weddings.jpg",
      alt: "Refined outdoor Western wedding ceremony surrounded by garden greenery and delicate white florals",
      formValue: "Western / Contemporary Elegance",
    },
    {
      id: "intimate-celebrations",
      title: "Intimate Gatherings",
      description:
        "Exclusive private estates, heirloom details, chef-crafted tasting menus, and unforgettable moments with your closest circle.",
      image: "/images/exp-intimate-celebrations.jpg",
      alt: "Warm candlelit evening reception table setting for an intimate wedding dinner",
      formValue: "Intimate Bespoke Gathering",
    },
  ],

  services: [
    {
      id: "planning-coordination",
      title: "End-to-End Planning & Production",
      description:
        "Comprehensive timelines, vendor contracts, financial auditing, and 360-degree on-site management.",
    },
    {
      id: "venue-destination",
      title: "Exclusive Palace & Venue Access",
      description:
        "Direct access to private royal palaces, closed heritage havelis, luxury island resorts, and negotiated VIP rates.",
    },
    {
      id: "design-styling",
      title: "3D Stage & Decor Design",
      description:
        "Photorealistic 3D visual renders, custom architectural lighting, statement floral sculptures, and fine table styling.",
    },
    {
      id: "guest-experience",
      title: "Guest Hospitality & Concierge",
      description:
        "Airport charters, luxury hotel room blocks, customized welcome gifts, digital RSVP apps, and 24/7 guest assistance.",
    },
  ],

  processSteps: [
    {
      step: "01",
      title: "Private Consultation",
      description:
        "We discuss your vision, preferred destinations, guest size, and preliminary budget in a friendly 1:1 discovery call.",
    },
    {
      step: "02",
      title: "Venue & 3D Design Preview",
      description:
        "We secure your dream venue at direct wholesale rates and present photorealistic 3D decor mockups for each ceremony.",
    },
    {
      step: "03",
      title: "Flawless Wedding Day",
      description:
        "Our team arrives 48 hours early to coordinate vendors, lighting, ceremonies, and guest care while you relax and celebrate.",
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
};



