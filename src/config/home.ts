// Everything on the home page that the owner may want to swap: photos and words.
// To change a photo, either replace the file in public/images/home/ (keep the same
// name), or put a new file there and change the path below.

import { site } from "@/config/site";

export const home = {
  announcement: "Heera Luxe enters a new chapter.  Coming soon.",

  // The "Coming soon" poster at the top. The words are part of the pictures, so to
  // change them, send new posters. Phones show the tall one; bigger screens the wide one.
  hero: {
    alt: "Heera Luxe enters a new chapter. Coming soon.",
    desktop: "/images/home/coming-soon.webp",
    mobile: { src: "/images/home/coming-soon-mobile.webp", width: 1024, height: 1536 },
  },

  // The strip of four promises under the banner. Keep these true.
  promises: [
    { icon: "gem", title: "Designed with intention", body: "Every piece, uniquely crafted" },
    { icon: "sparkles", title: "Premium details", body: "Sewn by hand, crystal by crystal" },
    { icon: "bag", title: "Made to stand out", body: "For everyday & special moments" },
    { icon: "truck", title: "Free shipping", body: "Anywhere in India" },
  ],

  glamour: {
    image: { src: "/images/home/glamour.webp", alt: "Pearl Me Up bag carried with a black outfit" },
    title: "Everyday glamour",
    body: "Pieces that move with you, shine with you.",
    button: { label: "Explore", href: "/shop/bags" },
  },

  // The two collection panels after Bestsellers. Which products are in each edit
  // lives in src/lib/catalog.ts (edits).
  edits: [
    { key: "crystal", image: { src: "/images/home/edit-crystal.webp", alt: "Crystal tassel bag held up close" } },
    { key: "beaded", image: { src: "/images/home/edit-beaded.webp", alt: "All Pearl Bag" } },
  ],

  // "Message from the founder", the last section of the home page.
  founder: {
    image: { src: "/images/home/founder.webp", alt: "Heena, founder of Heera Luxe" },
    title: "Message from the founder",
    paragraphs: [
      "Hi, I’m Heena, the founder and the face behind Heera Luxe.",
      "Heera Luxe started with a simple idea — fashion should never feel ordinary.",
      "I’ve always loved pieces that make you look twice: a little sparkle, an unexpected detail, a beautiful texture, or something that adds that little extra to an outfit.",
      "What started as a love for fashion slowly became Heera Luxe — a brand where I could bring together the things I genuinely love to wear: statement pieces, everyday essentials, and a little bit of glamour in between.",
      "I’m very involved in every part of Heera Luxe — from choosing and designing the products to deciding how they are presented. For me, that’s what makes this brand personal.",
      "I’m so happy you’re here.",
    ],
    signature: "with love Heena",
    role: "Founder, Heera Luxe",
  },

  // PHONE-ONLY sections and photos (bigger screens keep the layout above).
  // The photos are in public/images/home/mobile/. Replace a file with the same
  // name to change it; dark, close-up shots on a brown background fit best.
  mobile: {
    // The short block right under the poster.
    chapter: {
      title: "A new chapter is coming.",
      body: "New collections. Timeless details. Everyday glamour, reimagined.",
      button: { label: "Stay tuned", href: site.instagram.url },
    },
    glamourImage: "/images/home/mobile/glamour.webp",
    edits: {
      crystal: { image: "/images/home/mobile/edit-crystal.webp", body: "Rhinestones and crystal straps that catch every light." },
      beaded: { image: "/images/home/mobile/edit-beaded.webp", body: "For the moments worth dressing up for." },
    },
    tiles: [
      { title: "Bags", body: "Statement makers for every mood.", href: "/shop/bags", image: "/images/home/mobile/tile-bags.webp" },
      { title: "Footwear", body: "Step into something extraordinary.", href: "/shop", image: "/images/home/mobile/tile-footwear.webp" },
      { title: "Edits", body: "Curated collections, crafted to shine.", href: "/#edits", image: "/images/home/mobile/tile-edits.webp" },
      { title: "Bestsellers", body: "The pieces everyone asks about.", href: "/#bestsellers", image: "/images/home/mobile/tile-bestsellers.webp" },
    ],
    // The strip of three promises above the footer. Keep these true.
    trust: [
      { icon: "truck", title: "Free shipping", body: "Across India" },
      { icon: "refresh", title: "Size exchange", body: `Within ${site.exchangeDays} days` },
      { icon: "hand", title: "Handmade", body: "In India" },
    ],
    founderImage: "/images/home/mobile/founder.webp",
    tagline: "Everyday glamour, reimagined. Made to stand out. Made for you.",
  },
} as const;
