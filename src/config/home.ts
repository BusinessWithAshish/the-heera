// Everything on the home page that the owner may want to swap: photos and words.
// To change a photo, either replace the file in public/images/home/ (keep the same
// name), or put a new file there and change the path below.

export const home = {
  announcement: "The Heera enters a new chapter.  Coming soon.",

  // The "Coming soon" poster at the top. The words are part of the picture, so to
  // change them, send a new poster. A wide picture (about 4 times wider than tall) fits best.
  hero: {
    image: {
      src: "/images/home/coming-soon.webp",
      width: 1536,
      height: 400,
      alt: "The Heera: coming soon. This is just the beginning.",
    },
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
    image: { src: "/images/home/founder.webp", alt: "Heena, founder of The Heera" },
    title: "Message from the founder",
    paragraphs: [
      "Hi, I’m Heena, the founder and the face behind The Heera.",
      "The Heera started with a simple idea — fashion should never feel ordinary.",
      "I’ve always loved pieces that make you look twice: a little sparkle, an unexpected detail, a beautiful texture, or something that adds that little extra to an outfit.",
      "What started as a love for fashion slowly became The Heera — a brand where I could bring together the things I genuinely love to wear: statement pieces, everyday essentials, and a little bit of glamour in between.",
      "I’m very involved in every part of The Heera — from choosing and designing the products to deciding how they are presented. For me, that’s what makes this brand personal.",
      "I’m so happy you’re here.",
    ],
    signature: "with love Heena",
    role: "Founder, The Heera",
  },
} as const;
