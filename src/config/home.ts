// Everything on the home page that the owner may want to swap: photos and words.
// To change a photo, either replace the file in public/images/home/ (keep the same
// name), or put a new file there and change the path below.

import { site } from "@/config/site";

export const home = {
  announcement: "Heera Luxe enters a new chapter.  Coming soon.",

  // The sliding banner at the top. Slides move right to left every few seconds and
  // each one is a link. The first is the "Coming soon" poster (words are part of the
  // picture: phones show the tall poster, bigger screens the wide one). The others
  // are a photo with words beside it. Add, remove or reorder slides here; 3 to 4 is best.
  slides: [
    {
      kind: "poster",
      alt: "Heera Luxe enters a new chapter. Coming soon.",
      desktop: "/images/home/coming-soon.webp",
      mobile: "/images/home/coming-soon-mobile.webp",
      href: "/#new-in",
    },
    {
      kind: "feature",
      image: "/images/home/slides/slide-2.webp",
      alt: "Dazzle Silver Bag held up close",
      eyebrow: "The collection",
      title: "The Crystal Edit",
      body: "Rhinestones and crystal straps that catch every light.",
      button: "Explore the edit",
      href: "/edits/crystal",
    },
    {
      kind: "feature",
      image: "/images/home/slides/slide-3.webp",
      alt: "Pearl Me Up Bag with beaded tassels",
      eyebrow: "The collection",
      title: "The Beaded Edit",
      body: "Pearls and beads, strung and sewn by hand.",
      button: "Explore the edit",
      href: "/edits/beaded",
    },
    {
      kind: "feature",
      image: "/images/home/slides/slide-4.webp",
      alt: "Crescent Moon Silver Bag carried with a pink outfit",
      eyebrow: "Bling bags",
      title: "Carry the luxe",
      body: "Pearl, crystal and beaded bags, made by hand to finish the look.",
      button: "Shop bags",
      href: "/shop/bags",
    },
  ],

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

  // "Shop by type": the two wide panels after New In.
  shopByType: [
    { title: "Footwear", body: "Heels, flats & platforms", href: "/shop/footwear", image: "/images/home/type-heels.webp", alt: "Into the Night heels with a crystal brooch" },
    { title: "Bags", body: "Carry the luxe", href: "/shop/bags", image: "/images/home/type-bags.webp", alt: "Crystal bucket bag" },
  ],

  // "Style. Love. Shop.": Instagram reels. Put each video file (.mp4) in
  // public/videos/ and set `video` to its path; it then plays on its own, muted,
  // on a loop. Until a video is added, the photo shows instead. `href` is where a
  // tap goes: the reel's own Instagram link, or the Instagram page.
  reels: [
    { video: "/videos/reel-3.mp4", poster: "/images/home/reels/reel-3.webp", href: site.instagram.url, alt: "A black sequin look in a hotel corridor" },
    { video: "/videos/reel-1.mp4", poster: "/images/home/reels/reel-1.webp", href: site.instagram.url, alt: "Crystal and pearl bags up close" },
    { video: "/videos/reel-2.mp4", poster: "/images/home/reels/reel-2.webp", href: site.instagram.url, alt: "Unboxing a pair of Heera Luxe platforms" },
    { video: "/videos/reel-4.mp4", poster: "/images/home/reels/reel-4.webp", href: site.instagram.url, alt: "A look at Lakmé Fashion Week" },
    { video: "/videos/reel-5.mp4", poster: "/images/home/reels/reel-5.webp", href: site.instagram.url, alt: "Picking a festive look" },
    { video: "/videos/reel-6.mp4", poster: "/images/home/reels/reel-6.webp", href: site.instagram.url, alt: "What I wore for my brother's wedding" },
  ] as { video: string | null; poster: string; href: string; alt: string }[],

  // "Loved by you": customers wearing Heera Luxe. They drift slowly across the screen.
  lovedByYou: [1, 2, 3, 4, 5, 6].map((n) => `/images/brand/community-${n}.webp`),

  // "Message from the founder", the last section of the home page.
  founder: {
    // Bigger screens show the owner's own picture exactly as sent (words included).
    picture: { src: "/images/home/founder-message.webp", width: 1915, height: 821 },
    // Phones show the tall version of the owner's picture, also exactly as sent.
    phonePicture: { src: "/images/home/founder-message-mobile.webp", width: 997, height: 1577 },
    image: { alt: "Heena, founder of Heera Luxe" },
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

  // PHONE-ONLY extras (everything else on phones is shared with bigger screens).
  mobile: {
    // The strip of three promises above the footer. Keep these true.
    trust: [
      { icon: "truck", title: "Free shipping", body: "Across India" },
      { icon: "refresh", title: "Size exchange", body: `Within ${site.exchangeDays} days` },
      { icon: "hand", title: "Handmade", body: "In India" },
    ],
    tagline: "Everyday glamour, reimagined. Made to stand out. Made for you.",
  },
} as const;
